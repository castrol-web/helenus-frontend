import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  Clock,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  FileText,
  X,
} from "lucide-react";

const url = import.meta.env.VITE_SERVER_URL;

type ApplicationStatus = "Pending" | "Approved" | "Rejected";

type Application = {
  [x: string]: any;
  _id: string;
  type: "visa" | "job";
  applicant_name: string;
  status: ApplicationStatus;
  submitted_at: string;
  cv_file_url?: string;
  passport_file_url?: string;
};

const statusStyles = {
  Approved: "text-green-600 bg-green-100 border-green-300",
  Pending: "text-yellow-600 bg-yellow-100 border-yellow-300",
  Rejected: "text-red-600 bg-red-100 border-red-300",
};


const isPdf = (url: string) => {
  return url.toLowerCase().endsWith(".pdf");
};

const AdminApplicationManager = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docApplicant, setDocApplicant] = useState<string>("");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/applications`);
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    type: string,
    newStatus: ApplicationStatus
  ) => {
    try {
      await axios.patch(`${url}/api/admin/application/${type}/${id}`, {
        status: newStatus,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-4 space-y-6"
    >
      <h1 className="text-3xl font-bold text-center">Admin - Application Review</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications available.</p>
      ) : (
        applications.map((app) => {
          const icon =
            app.status === "Approved" ? (
              <BadgeCheck className="text-green-500 w-5 h-5" />
            ) : app.status === "Rejected" ? (
              <XCircle className="text-red-500 w-5 h-5" />
            ) : (
              <Clock className="text-yellow-500 w-5 h-5" />
            );

          return (
            <div
              key={app._id}
              className="bg-white border rounded-lg p-4 shadow-md space-y-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-lg font-semibold capitalize">
                    {app.applicant_name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {app.type.charAt(0).toUpperCase() + app.type.slice(1)} Application
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`badge border ${statusStyles[app.status]} text-sm p-3 flex items-center gap-2`}
                >
                  {icon}
                  <span className="capitalize">{app.status}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {app.cv_file_url && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoc(app.cv_file_url!);
                      setDocApplicant(app.applicant_name);
                    }}
                    className="btn btn-outline btn-sm flex items-center gap-1"
                  >
                    <FileText className="w-4 h-4" /> CV
                  </button>
                )}

                {app.passport_file_url && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoc(app.passport_file_url!);
                      setDocApplicant(app.applicant_name);
                    }}
                    className="btn btn-outline btn-sm flex items-center gap-1"
                  >
                    <FileText className="w-4 h-4" /> Passport
                  </button>
                )}
              </div>

              {app.status === "Pending" && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleUpdateStatus(app._id, app.type, "Approved")}
                  >
                    <ThumbsUp className="w-4 h-4" /> Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => handleUpdateStatus(app._id, app.type, "Rejected")}
                  >
                    <ThumbsDown className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                title="close"
                type="button"
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setSelectedDoc(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-bold mb-4">
                Reviewing: {docApplicant}'s Document
              </h2>

              {isPdf(selectedDoc) ? (
                <iframe
                  src={selectedDoc}
                  className="w-full h-[500px] border"
                  title="Document Viewer"
                />
              ) : (
                <div className="text-center">
                  <p className="mb-4">Preview not available for this document format.</p>
                  <a
                    href={selectedDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    download
                  >
                    Download Document
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminApplicationManager;
