"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { MouseEvent } from "react";
import Select from "react-dropdown-select";
import { useDropzone } from "react-dropzone";
import { db, storage } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface AddStickerType {
  community: string;
  stickerURL: string;
  verified: boolean;
  creator: string;
}

interface DropdownType {
  id: number;
  field: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#323232",
  borderRadius: 4,
  pt: 2,
  px: 2,
  pb: 2,
};

const AddStickerModal = ({ updateFlag }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dropValue, setDropValue] = useState<DropdownType[]>([
    {
      id: 1,
      field: "General",
    },
  ]);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsUploading(false);
    setOpen(false);
    setUploadedFiles([]);
  };

  const handleDropSelect = (item: DropdownType[]) => {
    setDropValue(item);
  };

  const dropdownVals: DropdownType[] = [
    { id: 1, field: "General" },
    { id: 2, field: "Toshi" },
    { id: 3, field: "Mochi" },
    { id: 4, field: "Normie" },
  ];

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          setUploadedFiles((prevUploadedFiles) => [
            ...prevUploadedFiles,
            { src: reader.result, file: file },
          ]);
        };

        reader.readAsDataURL(file);
      });
    },
  });

  const dropdownRenderer = ({ props, state, methods }) => {
    return (
      <div style={{ background: "#323232", border: "1px #525252 solid" }}>
        <div>
          {props.options.map((option) => {
            return (
              <div
                disabled={option.disabled}
                key={option[props.valueField]}
                onClick={option.disabled ? null : () => methods.addItem(option)}
              >
                <div>{option[props.labelField]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleUploadSticker = () => {
    setIsUploading(true);
    uploadedFiles.map((file) => uploadFiles(file.file));
  };

  const uploadFiles = (file) => {
    const imageRef = storageRef(
      storage,
      `stickers/${dropValue[0].field}/${uuidv4()}`
    );

    uploadBytes(imageRef, file)
      .then(async (snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            postSticker(url)
              .then(() => {
                console.log("finished uploaded");
                setIsUploading(false);
                setOpen(false);
                setUploadedFiles([]);
                updateFlag(true);
              })
              .catch((error) => {
                console.log(error.message);
                setIsUploading(false);
              });
          })
          .catch((error) => {
            // toastifyError(error.message);
            console.log(error.message);
            setIsUploading(false);
          });
      })
      .catch((error) => {
        // toastifyError(error.message);
        console.log(error.message);
        setIsUploading(false);
      });
  };

  const postSticker = async (imageURL: string) => {
    console.log("here");
    const res = await addDoc(
      collection(db, `stickers/community/${dropValue[0].field}`),
      {
        community: dropValue[0].field,
        stickerURL: imageURL,
        verified: false,
        creator: "sarvad",
      }
    );
    return res.id;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          borderRadius: 30,
          overflow: "hidden",
          border: "1px #525252 solid",
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingTop: "10px",
          paddingBottom: "10px",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <img
          src="addSticker.svg"
          style={{ height: "12px", width: "12px", cursor: "pointer" }}
          alt="text"
        />
        <label
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: "600",
            wordWrap: "break-word",
            cursor: "pointer",
          }}
        >
          Create new sticker
        </label>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "290px",
            width: "auto",
            maxWidth: "400px",
            height: "auto",
            backgroundColor: "#323232",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: 10,
            }}
          >
            <label
              style={{
                color: "white",
                fontSize: 12,
                fontFamily: "Inter",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              Add Sticker
            </label>

            <Select
              values={dropValue}
              options={dropdownVals}
              labelField="field"
              valueField="id"
              onChange={handleDropSelect}
              dropdownHandle={true}
              color="#323232"
              style={{
                border: "1px #525252 solid",
                background: "#323232",
                borderRadius: 8,
              }}
              dropdownRenderer={(innerProps, innerState, innerMethods) =>
                dropdownRenderer(innerProps, innerState, innerMethods)
              }
            />

            <div
              style={{
                border: "1px #525252 dashed",
                borderRadius: 4,
                padding: 16,
                cursor: "pointer",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {uploadedFiles.length == 0 && (
                <label
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontFamily: "Inter",
                    fontWeight: "200",
                    wordWrap: "break-word",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Drag and drop files here or click to browse. (.png/.webp)
                </label>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
                  gap: "10px",
                  maxHeight: "600px",
                  overflowY: "auto",
                }}
              >
                {uploadedFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={file.src}
                      alt="text"
                      style={{ height: "50px", width: "50px" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div
                style={{
                  // flex: "1",
                  paddingLeft: 32,
                  paddingRight: 32,
                  paddingTop: 12,
                  paddingBottom: 12,
                  background: "#0252FF",
                  borderRadius: "12px",
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  display: "flex",
                  flexDirection: "row",
                  height: "40px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  pointerEvents: `${isUploading ? "none" : "visible"}`,
                  opacity: isUploading ? 0.5 : 1,
                }}
                onClick={handleUploadSticker}
              >
                <label
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 14,
                    fontWeight: "600",
                    wordWrap: "break-word",
                    cursor: "pointer",
                  }}
                >
                  {isUploading ? "Uploading Stickers..." : "Upload Sticker"}
                </label>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddStickerModal;
