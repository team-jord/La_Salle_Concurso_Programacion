import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, useTheme } from "@mui/material";

const DropZoneMultiple = ({ saveFile }) => {
  const theme = useTheme();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      saveFile(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: [".jpg", ".png", ".jpeg", ".JPG", ".PNG", ".JPEG"],
    maxSize: 5242880,
    maxFiles: 5,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        height: "100px",
        borderRadius: 10,
        borderColor: theme.palette.primary.main,
        justifyContent: "center",
        alignItems: "center",
        width: "-webkit-fill-available",
        border: "dashed",
      }}
    >
      <input {...getInputProps()} />
      <Typography
        variant="subtitle2"
        textAlign="center"
        style={{ padding: 20 }}
      >
        {isDragActive
          ? "Arroja aqui tus archivos"
          : "Arrastra aqui o click para agregar una foto"}
      </Typography>
    </div>
  );
};

export default DropZoneMultiple;
