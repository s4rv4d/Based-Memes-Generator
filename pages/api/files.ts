import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
// const pinataSDK = require("@pinata/sdk");
import * as pinataSDK from "@pinata/sdk";

const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ODEyNzY2NS1jZjNjLTRkNzAtOTZiNS1kYTdjNjFlNzM1YjgiLCJlbWFpbCI6InNhcnZhZHNoZXR0eUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTk4OWYwZWIyMmUxNzA4MzkyZTEiLCJzY29wZWRLZXlTZWNyZXQiOiIyMTI3MTYzMjkwMjk4NzY3Mjc2YjE1MGQ0ZWU2NzNmNTA3MjFlZWUyMjE4NjNiYTQ4MTI2OTdiZWE3NjM4YTMxIiwiaWF0IjoxNzA3MjQ3ODExfQ.glvWqmFoqFRnlsRo6y8EzfX4s5Fqv7CeOBF8tzPZUfE";

// @ts-ignore
const pinata = new pinataSDK({ pinataJWTKey: jwtToken });

console.log(pinata);

export const config = {
  api: {
    bodyParser: false,
  },
};

interface Fields {
  name: string;
  description: string;
}

const saveFile = async (file: File, fields: Fields) => {
  console.log("here 2");
  console.log(file);

  try {
    const stream = fs.createReadStream(file[0].filepath);
    const options = {
      pinataMetadata: {
        name: fields.name[0],
        keyvalues: {
          description: fields.description[0],
        },
      },
    };

    console.log("69");
    console.log(stream);
    // @ts-ignore
    const response = await pinata.pinFileToIPFS(stream, options);
    console.log("here3");
    console.log(response);
    fs.unlinkSync(file[0].filepath);

    return response;
  } catch (error) {
    console.log("looogg", error);
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("here1");

    try {
      // const form = new formidable.IncomingForm();
      const form = formidable({});

      console.log("incoming form", form);

      form.parse(
        req,
        async (err, fields: formidable.Fields, files: formidable.Files) => {
          try {
            if (err) {
              console.log({ err });
              return res.status(500).send("Upload Error");
            }
            // Ensure correct typing for file, might require custom handling depending on your setup
            const response = await saveFile(
              files.file as File,
              fields as Fields
            );
            const { IpfsHash } = response;

            return res.status(200).send(IpfsHash);
          } catch (error) {
            console.log(error);
            return res.status(500).send("Error processing file");
          }
        }
      );
    } catch (e) {
      console.log(e);
      return res.status(500).send("Server Error");
    }
  } else if (req.method === "GET") {
    try {
      // @ts-ignore
      const response = await pinata.pinList(
        { pinataJWTKey: process.env.PINATA_JWT },
        {
          pageLimit: 1,
        }
      );
      return res.json(response.rows[0]);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Server Error");
    }
  } else {
    return res.status(405).send("Method Not Allowed");
  }
}
