import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PdfViewer: React.FC = () => {
  const { supplierId } = useParams<{ supplierId: string }>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      if (!supplierId) {
        setError("No supplier ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://156.67.80.195/api/Supplier/ViewSubmittedDocument/${supplierId}`,
          {
            responseType: "blob", // important for binary file
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        setPdfUrl(blobUrl);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch PDF.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [supplierId]);
  console.log("PDF URL:", pdfUrl);

  if (loading) return <p>Loading PDF...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={pdfUrl || ""}
        title="Supplier PDF"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PdfViewer;
