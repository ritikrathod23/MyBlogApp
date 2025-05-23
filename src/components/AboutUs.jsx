import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">
          About Us
        </h1>

        {/* Introduction */}
        <p className="text-lg leading-7 mb-6 text-center">
          Welcome to <span className="font-semibold text-indigo-500">BlogVerse</span> — your daily dose of inspiration, knowledge, and creativity. We’re a community of passionate writers and readers sharing thoughts on tech, lifestyle, productivity, and more.
        </p>

        {/* Section: Our Mission */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Mission</h2>
          <p className="text-base leading-7">
            Our goal is to empower voices and connect communities through written expression. Whether you're a seasoned writer or just getting started, BlogVerse provides a space where your stories matter.
          </p>
        </div>

        {/* Section: What We Offer */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-base leading-6">
            <li>📚 Insightful blogs on tech, health, travel, and more.</li>
            <li>📝 Easy-to-use editor to publish your own content.</li>
            <li>💬 Engage with a vibrant community of readers and authors.</li>
            <li>🔍 Discover trending posts and recommended reads.</li>
          </ul>
        </div>

        {/* Section: Join Us */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Join Us</h2>
          <p className="text-base leading-7 mb-4">
            Ready to start your blogging journey? Sign up and share your first post today!
          </p>
          {/* <div className="text-center">
            <Link
              href="/login"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-200"
            >
              Get Started
            </Link>
          </div> */}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} BlogVerse. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
