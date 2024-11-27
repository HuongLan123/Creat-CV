import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faBriefcase, faGraduationCap, faHeart, faLightbulb, faProjectDiagram, faTools, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Template1.css";
const CV = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    phone: "",
    email: "",
    address: "",
    objective: [""],
    skills: [""],
    certificate: [""],
    hobbies: [""],
    education: [""],
    experience: [""],
    activities: [""],
    projects: [""],
  });
  const [profileImage, setProfileImage] = useState(null);
  const cvRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = () => {
    const input = cvRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10; // Lề 25mm (2.5cm)
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Width với lề
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Thêm hình ảnh vào PDF với lề
    pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight); // Lề áp dụng cho vị trí (margin, margin)

    // Lưu tệp PDF
    pdf.save("CV.pdf");
    });
  };
 const handleChange = (e) => {
  const { name, value } = e.target;
  if (["objective", "skills", "certificate", "hobbies", "education", "experience", "activities", "projects"].includes(name)) {
    // Chỉnh sửa dữ liệu trước khi set vào state
    setFormData({ 
      ...formData, 
      [name]: value.split("\n")
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  return (
    <div className="cv-container">
      <div className="cv-editor">
      <div>
        <h2>Chỉnh sửa CV của bạn</h2>
        <div>
          <p><strong>Chọn ảnh đại diện:</strong></p>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Họ và tên" />
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Chức danh nghề nghiệp" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="address" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" />
        <textarea name="objective" value={formData.objective.join("\n")} onChange={handleChange} placeholder="Mục tiêu nghề nghiệp"></textarea>
        <textarea name="skills" value={formData.skills.join("\n")} onChange={handleChange} placeholder="Kỹ năng (mỗi dòng 1 mục)"></textarea>
        <textarea name="certificate" value={formData.certificate.join("\n")} onChange={handleChange} placeholder="Giải thưởng (mỗi dòng 1 mục)"></textarea>
        <textarea name="hobbies" value={formData.hobbies.join("\n")} onChange={handleChange} placeholder="Sở thích (mỗi dòng 1 mục)"></textarea>
        <textarea name="education" value={formData.education.join("\n")} onChange={handleChange} placeholder="Học vấn (mỗi dòng 1 mục)"></textarea>
        <textarea name="experience" value={formData.experience.join("\n")} onChange={handleChange} placeholder="Kinh nghiệm (mỗi dòng 1 mục)"></textarea>
        <textarea name="activities" value={formData.activities.join("\n")} onChange={handleChange} placeholder="Hoạt động (mỗi dòng 1 mục)"></textarea>
        <textarea name="projects" value={formData.projects.join("\n")} onChange={handleChange} placeholder="Dự án (mỗi dòng 1 mục)"></textarea>
      </div>
      </div>
    <div className="cv-container1">
      <div ref={cvRef} className="cv-preview">
        <header className="cv-header">
          {profileImage ? <img src={profileImage} alt="Profile" className="profile-img" /> : <div className="placeholder-img">Upload Image</div>}
          <div className="cv-header-plot">
            <h1>{formData.name}</h1>
            <h3>{formData.jobTitle}</h3>
            <p><strong style={{color: "rgb(205,133,63)"}}>SĐT:</strong> {formData.phone}</p>
            <p><strong style={{color: "rgb(205,133,63)"}}>Email:</strong> {formData.email}</p>
            <p><strong style={{color: "rgb(205,133,63)"}}>Địa chỉ:</strong> {formData.address}</p>
          </div>
        </header>

        <main className="cv-main">
          <div className="main-left">
            <section>
              <h3><FontAwesomeIcon icon={faLightbulb} /><span style={{ marginLeft: "8px" }}>Mục tiêu nghề nghiệp</span></h3>
              <ul>{formData.objective.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
            <section>
              <h3><FontAwesomeIcon icon={faTools} /><span style={{ marginLeft: "8px" }}>Kỹ năng</span></h3>
              <ul>{formData.skills.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
            <section>
              <h3><FontAwesomeIcon icon={faAward} /><span style={{ marginLeft: "8px" }}>Chứng chỉ</span></h3>
              <ul>{formData.certificate.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
            <section>
              <h3><FontAwesomeIcon icon={faHeart} /><span style={{ marginLeft: "8px" }}> Sở thích</span></h3>
              <ul>{formData.hobbies.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
          </div>
          <div className="main-right">
            <section>
              <h3><FontAwesomeIcon icon={faGraduationCap} /><span style={{ marginLeft: "8px" }}> Trình độ học vấn</span></h3>
              <ul>{formData.education.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
            <section>
              <h3><FontAwesomeIcon icon={faBriefcase} /><span style={{ marginLeft: "8px" }}> Kinh nghiệm làm việc</span></h3>
              <ul>{formData.experience.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
            <section>
              <h3><FontAwesomeIcon icon={faUser} /><span style={{ marginLeft: "8px" }}> Hoạt động</span></h3>
              <ul>{formData.activities.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
            <section>
              <h3><FontAwesomeIcon icon={faProjectDiagram} /><span style={{ marginLeft: "8px" }}> Dự án</span></h3>
              <ul>{formData.projects.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </section>
          </div>
        </main>
      </div>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
    </div>
  );
};

export default CV;