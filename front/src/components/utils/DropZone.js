import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, useTheme } from "@mui/material";

export default function DropZone({ saveFile }) {
  const theme = useTheme();
  const onDrop = useCallback((acceptedFiles) => {
    saveFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: [".jpg", ".png", ".jpeg", ".JPG", ".PNG", ".JPEG"],
    maxSize: 5242880,
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
        backgroundImage:
          "url(https://cdn.dribbble.com/users/63485/screenshots/1328810/download-cloud-gif-preloader.gif)",
        padding: "20px",
        margin: "30px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(66,154,206,255)",
        borderRadius: "10px",
      }}
    >
      <input {...getInputProps()} />
      <Typography
        variant="subtitle2"
        textAlign="center"
        style={{ padding: 20 }}
      >
        {/* {isDragActive
          ? "Arroja aqui tus archivos"
          : "Arrastra aqui o click para agregar una foto"} */}
      </Typography>
    </div>
  );
}
