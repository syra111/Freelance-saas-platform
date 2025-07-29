
const Task = require("../models/Task");
const Job = require("../models/Job");

exports.createTask = async (req, res) => {
  const { jobId, title, description, assignedTo } = req.body;

  try {
    const task = await Task.create({ job: jobId, title, description, assignedTo });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

exports.submitTaskWork = async (req, res) => {
  const { submittedWork, submittedLink } = req.body;
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status === "approved") {
      return res.status(400).json({ message: "Task already approved. Cannot resubmit." });
    }

    task.submittedWork = submittedWork;
    task.submittedLink = submittedLink;
    task.submittedFile = req.file ? `/uploads/tasks/${req.file.filename}` : "";
    task.status = "submitted";

    await task.save();
    res.status(200).json({ message: "Task submitted", task });
  } catch (error) {
    res.status(500).json({ message: "Submission failed", error: error.message });
  }
};

exports.reviewTask = async (req, res) => {
  const { taskId } = req.params;
  const { action } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (action === "approve") {
      task.status = "approved";
    } else if (action === "reject") {
      task.status = "inprogress";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await task.save();

    const tasks = await Task.find({ job: task.job });

    if (tasks.length > 0) {
      const allApproved = tasks.every(t => t.status === "approved");

      if (allApproved) {
        const job = await Job.findByIdAndUpdate(task.job, { status: "completed" }, { new: true });

        if (job?.assignedFreelancer) {
          const { autoGenerateCertificate } = require("./certificateController");
          await autoGenerateCertificate(job.assignedFreelancer, job._id);
        } else {
          console.warn("Job has no assigned freelancer. Certificate not issued.");
        }
      }
    }

    res.status(200).json({ message: `Task ${action}d`, task });
  } catch (error) {
    res.status(500).json({ message: "Failed to review task", error: error.message });
  }
};

exports.getTasksByJob = async (req, res) => {
  try {
    const tasks = await Task.find({ job: req.params.jobId }).populate("assignedTo", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks", error: error.message });
  }
};
