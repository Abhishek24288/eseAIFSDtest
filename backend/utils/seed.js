const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Candidate = require('../models/Candidate');

dotenv.config();

const sampleCandidates = [
  {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "AWS"],
    experience: 5,
    bio: "Senior Full Stack developer specializing in MERN ecosystem with cloud infrastructure management experience.",
    resumeUrl: "https://linkedin.com/in/rahul-sharma"
  },
  {
    name: "Priya Patel",
    email: "priya@outlook.com",
    skills: ["React", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Figma"],
    experience: 2,
    bio: "UI/UX engineer and React developer focused on building pixel-perfect, highly accessible responsive layouts.",
    resumeUrl: "https://linkedin.com/in/priya-patel"
  },
  {
    name: "Amit Verma",
    email: "amit.verma@gmail.com",
    skills: ["Node.js", "Python", "MongoDB", "Redis", "Docker", "SQL"],
    experience: 6,
    bio: "Backend developer specializing in building distributed real-time APIs, scalable database architectures, and containerized microservices.",
    resumeUrl: "https://linkedin.com/in/amit-verma"
  },
  {
    name: "Rohan Das",
    email: "rohan.das@gmail.com",
    skills: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    experience: 1,
    bio: "Junior full stack MERN developer and recent bootcamp graduate eager to solve challenging business problems.",
    resumeUrl: "https://linkedin.com/in/rohan-das"
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@yahoo.com",
    skills: ["React Native", "Swift", "Kotlin", "Firebase", "JavaScript"],
    experience: 4,
    bio: "Experienced cross-platform mobile developer with a track record of delivering 4+ production apps to App Store and Google Play.",
    resumeUrl: "https://linkedin.com/in/sneha-reddy"
  }
];

const seedDB = async () => {
  let isMongo = false;
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/candidate-shortlister';
    // Fail fast if MongoDB is not running locally (2-second timeout)
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log("✅ Connected to MongoDB for seeding...");
    isMongo = true;
  } catch (error) {
    console.log("⚠️ Local MongoDB connection failed (ECONNREFUSED).");
    console.log("📂 Seeding fallback local JSON file database instead...");
  }

  try {
    await Candidate.deleteMany({});
    console.log("Cleared existing candidates database.");

    await Candidate.insertMany(sampleCandidates);
    console.log("Successfully seeded 5 diverse candidate profiles.");

    if (isMongo) {
      await mongoose.connection.close();
      console.log("Database connection closed safely.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
