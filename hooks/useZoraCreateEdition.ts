import { uint64MaxSafe } from "../utils/uint64";
import { z } from "zod";
import { Decimal } from "decimal.js";
import { ZoraAbi, getContractFromChainId } from "../abi/zoraEdition";
import { Address } from "viem";

export const EditionConfig = z.object({
  name: z.string(),
  symbol: z.string(),
  editionSize: z.string(),
  royaltyBPS: z.number(),
  fundsRecipient: z.string(),
  defaultAdmin: z.string(),
  saleConfig: z.object({
    publicSalePrice: z.string(),
    maxSalePurchasePerAddress: z.number(),
    publicSaleStart: z.string(),
    publicSaleEnd: z.string(),
    presaleStart: z.string(),
    presaleEnd: z.string(),
    presaleMerkleRoot: z.string(),
  }),
  description: z.string(),
  animationURI: z.string(),
  imageURI: z.string(),
  referrer: z.string(),
});

export const ZoraEdition = z.object({
  chainId: z.number(),
  address: z.string(),
  config: EditionConfig,
});

export const EditionNameSchema = z
  .string()
  .min(1, { message: "Name is required" });

export const EditionSymbolSchema = z
  .string()
  .min(1, { message: "Symbol is required" });

export const EditionSizeSchema = z
  .union([
    z.literal("open"),
    z.string().min(1, { message: "Edition size is required" }),
  ])
  .transform((val, ctx) => {
    if (val === "open") {
      return uint64MaxSafe.toString();
    }
    if (val === "one") {
      return "1";
    }
    const result = BigInt(val);
    if (!result) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Edition size must be greater than 0",
        path: ["editionSize"],
      });
      return z.NEVER;
    }

    return result.toString();
  });

export const EditionRoyaltyBPSSchema = z
  .union([
    z.literal("zero"),
    z.literal("five"),
    z.string().min(1, { message: "Royalty % is required" }),
  ])
  .transform((val) => {
    if (val === "zero") {
      return 0;
    }
    if (val === "five") {
      return 500;
    }
    const bps = parseInt(new Decimal(val).times(100).toString());
    return bps;
  });

export const EditionPublicSalePriceSchema = z
  .union([
    z.literal("free"),
    z.string().min(1, { message: "Edition price is required" }),
  ])
  .transform((val) => {
    if (val === "free") return "0";
    return new Decimal(val).times(10 ** 18).toString();
  });

export const calcSaleStart = (saleStart: string) => {
  const unixInS = (str: string | number | Date) =>
    Math.floor(new Date(str).getTime() / 1000);
  const now = unixInS(new Date(Date.now()));
  if (saleStart === "now") return now;
  return unixInS(saleStart);
};

export const calcSaleEnd = (saleEnd: string) => {
  const unixInS = (str: string | number | Date) =>
    Math.floor(new Date(str).getTime() / 1000);
  const now = unixInS(new Date(Date.now()));
  const three_days = now + 259200;
  const week = now + 604800;
  if (saleEnd === "forever") return uint64MaxSafe;
  if (saleEnd === "3 days") return three_days;
  if (saleEnd === "week") return week;
  return unixInS(saleEnd);
};

export const EditionSaleConfigSchema = z
  .object({
    publicSalePrice: EditionPublicSalePriceSchema,
    publicSaleStart: z.union([z.string().datetime(), z.literal("now")]),
    publicSaleEnd: z.union([
      z.string().datetime(),
      z.literal("forever"),
      z.literal("week"),
      z.literal("3 days"),
    ]),
  })
  .transform((val, ctx) => {
    const { publicSalePrice, publicSaleStart, publicSaleEnd } = val;
    const unixInS = (str: string | number | Date) =>
      Math.floor(new Date(str).getTime() / 1000);
    const now = unixInS(new Date(Date.now()));
    const week = now + 604800;
    const unixSaleStart = calcSaleStart(publicSaleStart);
    const unixSaleEnd = calcSaleEnd(publicSaleEnd);
    if (unixSaleStart < now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Public sale start must be in the future",
        path: ["publicSaleStart"],
      });
      return z.NEVER;
    }

    if (unixSaleStart > unixSaleEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Public sale end must be after public sale start",
        path: ["publicSaleEnd"],
      });
      return z.NEVER;
    }

    return {
      publicSalePrice,
      publicSaleStart: unixSaleStart.toString(),
      publicSaleEnd: unixSaleEnd.toString(),
    };
  });

export const parseIpfsUrl = (url: string) => {
  if (url.startsWith("ipfs://")) {
    const hash = url.split("ipfs://")[1];
    return {
      raw: url,
      gateway: `https://coffee-magnificent-catshark-232.mypinata.cloud/ipfs/${hash}`,
    };
  }
  if (
    url.startsWith(
      "https://coffee-magnificent-catshark-232.mypinata.cloud/ipfs/"
    )
  ) {
    const hash = url.split(
      "https://coffee-magnificent-catshark-232.mypinata.cloud/ipfs/"
    )[1];
    return {
      raw: `ipfs://${hash}`,
      gateway: url,
    };
  }
  return {
    raw: url,
    gateway: url,
  };
};

export type ZoraEditionConfig = z.infer<typeof EditionConfig>;

export const ConfigurableZoraEditionSchema = z
  .object({
    creator: z.string().min(1, { message: "You must be signed in" }),
    name: z.string().min(1, { message: "Name is required" }),
    symbol: z.string().min(1, { message: "Symbol is required" }),
    editionSize: EditionSizeSchema,
    royaltyBPS: EditionRoyaltyBPSSchema,
    description: z.string().min(1, { message: "Description is required" }),
    animationURI: z.string(),
    imageURI: z.string(),
    saleConfig: EditionSaleConfigSchema,
  })
  .transform((val, ctx) => {
    if (val.animationURI && !val.imageURI) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video thumbnail must be set",
        path: ["animationURI"],
      });
      return z.NEVER;
    }

    if (!val.imageURI) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image must be set",
        path: ["imageURI"],
      });
      return z.NEVER;
    }

    const output: ZoraEditionConfig = {
      name: val.name,
      symbol: val.symbol,
      editionSize: val.editionSize,
      royaltyBPS: val.royaltyBPS,
      fundsRecipient: val.creator,
      defaultAdmin: val.creator,
      saleConfig: {
        publicSalePrice: val.saleConfig.publicSalePrice,
        maxSalePurchasePerAddress: 2147483647, // max int32
        publicSaleStart: val.saleConfig.publicSaleStart,
        publicSaleEnd: val.saleConfig.publicSaleEnd,
        presaleStart: "0",
        presaleEnd: "0",
        presaleMerkleRoot:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
      description: val.description,
      animationURI: parseIpfsUrl(val.animationURI).raw,
      imageURI: parseIpfsUrl(val.imageURI).raw,
      referrer: "0x5371d2E73edf765752121426b842063fbd84f713",
    };

    return output;
  });

export type ConfigurableZoraEdition = z.infer<
  typeof ConfigurableZoraEditionSchema
>;

export type ConfigurableZoraEditionInput = z.input<
  typeof ConfigurableZoraEditionSchema
>;

export type ConfigurableZoraEditionOutput = z.output<
  typeof ConfigurableZoraEditionSchema
>;

export const flattenContractArgs = (
  args: ConfigurableZoraEditionOutput | null
) => {
  if (!args) return null;
  return Object.entries(args).map(([key, val], idx) => {
    if (key === "saleConfig") return Object.values(val);
    return val;
  });
};

export const generateTokenIdAdjustedContractArgs = (
  contractArgs: ConfigurableZoraEditionOutput | null,
  tokenID: number | null
) => {
  const appendedTokenID = tokenID ? tokenID.toString() : "";

  if (!contractArgs) {
    return null;
  }
  return {
    ...contractArgs,
    name: contractArgs.name + " " + appendedTokenID,
  };
};

export function createTestZoraEditionConfig(
  ipfsHash: string,
  creatorAddress: Address
): ConfigurableZoraEditionOutput | null {
  // Example test data object
  const testData = {
    creator: creatorAddress,
    name: "Based Meme",
    symbol: "BMEME",
    editionSize: "open",
    royaltyBPS: "zero",
    description: "Meme created by BasedMeme generator",
    animationURI: ipfsHash,
    imageURI: ipfsHash,
    saleConfig: {
      publicSalePrice: "free",
      publicSaleStart: "now",
      publicSaleEnd: "forever",
    },
  };

  // Validate and transform the test data using ConfigurableZoraEditionSchema
  const result = ConfigurableZoraEditionSchema.safeParse(testData);

  if (result.success) {
    // Successfully validated and transformed data
    return result.data;
  } else {
    // Handle errors or issues in test data
    console.error("Validation failed", result.error);
    return null;
  }
}
