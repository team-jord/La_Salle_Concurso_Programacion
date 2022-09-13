import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { useDropzone, DropEvent } from "react-dropzone";
import { useSnackbar } from "notistack";
import { Box, Paper, IconButton } from "@material-ui/core";
import { CloudUpload, Delete } from "@material-ui/icons";

export function useFileDropzone(props) {
  const [files, setFiles] = useState(props.files);
  const filesRef = useRef(files);
  // Save latest images in ref
  useEffect(() => {
    filesRef.current = files;
  }, [files]);
  // When this hook is not mounted anymore, remove all images from memory
  // Images are stored in ref because it's mutable
  useEffect(() => {
    return () =>
      filesRef.current.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return [() => <FileDropzone files={[files, setFiles]} />, files];
}

function FileDropzone({ files: [files, setFiles] }) {
  const snackbar = useSnackbar();

  const onDrop = (accepted, rejected) => {
    // Notify for rejected files
    if (rejected.length > 0) {
      rejected.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          snackbar.enqueueSnackbar("Invalid file type: " + file.name, {
            variant: "error",
          });
        } else if (file.size > 2_000_000) {
          snackbar.enqueueSnackbar("File to big: " + file.name, {
            variant: "error",
          });
        } else {
          snackbar.enqueueSnackbar("Invalid file: " + file.name, {
            variant: "error",
          });
        }
      });
    }
    const newFiles = accepted.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles([...files, ...newFiles]);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 2_000_000,
    multiple: true,
  });

  let bgColor = "";
  if (!isDragActive) bgColor = "bg-gray-200";
  if (isDragAccept && isDragActive) bgColor = "bg-blue-300";
  if (isDragReject && isDragActive) bgColor = "bg-red-300";

  return (
    <div>
      <div
        {...getRootProps()}
        className={`center h-64 border-dashed border-gray-300 border-4 ${bgColor}`}
      >
        <input {...getInputProps()} />
        <div>
          <div className="text-center text-6xl w-full">
            <CloudUpload fontSize="inherit" />
          </div>
          <p className="text-center px-5">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <p className="text-center pt-4 text-lg">
          Added files (you can reorder them latter)
        </p>
      )}
      <Box
        py={3}
        style={{
          display: "grid",
          gridTemplateColumns: "32% 32% 32%",
          gridTemplateRows: "150",
          gridColumnGap: "2%",
          gridRowGap: "25px",
          justifyItems: "center",
        }}
      >
        {files.map((file, i) => (
          <Paper key={i} className="center p-2 relative" elevation={4}>
            <Paper
              elevation={5}
              className="top-0 right-0"
              style={{
                marginTop: "-15px",
                marginRight: "-15px",
                background: "white",
                position: "absolute",
                borderRadius: "100%",
              }}
            >
              <IconButton
                onClick={() => {
                  const remaining = files.filter((file, index) => {
                    if (i === index) {
                      URL.revokeObjectURL(files[index].preview);
                      return false;
                    }
                    return true;
                  });
                  setFiles([...remaining]);
                }}
              >
                <Delete />
              </IconButton>
            </Paper>
            <img src={file.preview} alt={file.file.name} />
          </Paper>
        ))}
      </Box>
    </div>
  );
}
