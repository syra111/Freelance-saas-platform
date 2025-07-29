const path = require("path");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const generateCertificate = require("../utils/generateCertificate");
const Certificate = require("../models/Certificate");
const Job = require("../models/Job");

exports.autoGenerateCertificate = async (userId, jobId) => {
  try {
    const job = await Job.findById(jobId);
    if (!job) throw new Error("Job not found");

    const filename = `${userId}_${jobId}_${Date.now()}.pdf`;
    const localPath = path.join(__dirname, `../certificates/${filename}`);

    await generateCertificate("Freelancer Name", job.title, filename);

    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "raw",
      folder: "certificates"
    });

    await Certificate.create({
      user: userId,
      job: jobId,
      pdf_url: result.secure_url,
      issued_date: new Date()
    });

    fs.unlinkSync(localPath);
    return result.secure_url;
  } catch (err) {
    console.error("Certificate Generation Error:", err.message);
    return null;
  }
};

exports.getCertificateByJob = async (req, res) => {
  try {
    const cert = await Certificate.findOne({
      user: req.user._id,
      job: req.params.jobId
    });

    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ url: cert.pdf_url });
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificate", error: err.message });
  }
};
