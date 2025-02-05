# lab08
- แก้ไขปัญหา Cannot read properties of null
- พิ่มการตรวจสอบ document.getElementById ว่าไม่เป็น null ก่อนใช้ addEventListener
- ตรวจสอบ this.form และองค์ประกอบ UI อื่น ๆ ก่อนใช้งาน

- แก้ไขปัญหาการอ่าน/เขียนค่า null ใน localStorage
- เพิ่มการตรวจสอบข้อมูลที่โหลดมาจาก localStorage ว่าไม่เป็น null
- ถ้าข้อมูลไม่ถูกต้อง จะกำหนดค่าเป็น [] เพื่อป้องกัน error


- เพิ่มการตรวจสอบค่าก่อนใช้งาน (undefined หรือ null Handling)
- ใน handleSubmit() ตรวจสอบค่าที่ป้อนก่อนบันทึก
- ใน editBlog() และ deleteBlog() ตรวจสอบว่าพบบล็อกหรือไม่ก่อนดำเนินการ

- แก้ปัญหาการเปรียบเทียบ updatedDate ใน sortBlogs()
- ช้ .getTime() เพื่อให้แน่ใจว่าเปรียบเทียบค่า Date ได้ถูกต้อง

- เพิ่ม console.log() เพื่อตรวจสอบค่าระหว่างการทำงาน
- ตรวจสอบค่าที่บันทึกและโหลดจาก localStorage
- ตรวจสอบค่าที่ใช้ใน render()

- ป้องกัน Cannot read properties of null
- initElements() {
-    this.form = document.getElementById("blog-form");
-    if (!this.form) {
-         console.error("Element #blog-form not found!");
-         return;
-    }
-    this.titleInput = document.getElementById("title") || {};
-    this.contentInput = document.getElementById("content") || {};
-    this.tagInput = document.getElementById("tags") || {};
-    this.editIdInput = document.getElementById("edit-id") || {};
-    this.blogList = document.getElementById("blog-list") || {};
-    this.formTitle = document.getElementById("form-title") || {};
-    this.cancelBtn = document.getElementById("cancel-btn") || {};
-    this.filterTagInput = document.getElementById("filter-tag") || {};
- }

-  แก้ปัญหาการโหลด localStorage ที่เป็น null
- loadBlogs() {
-     const storedBlogs = localStorage.getItem("blogs");
-    if (!storedBlogs) {
-        console.warn("No blogs found in localStorage, initializing empty array.");
-        this.blogs = [];
-        return;
-    }
- 
-    try {
-       this.blogs = JSON.parse(storedBlogs).map(
-            (blog) => new Blog(blog.id, blog.title, blog.content, blog.tags, blog.createdDate, blog.updatedDate)
-        );
-        this.sortBlogs();
-    } catch (error) {
-        console.error("Error parsing blogs from localStorage:", error);
-        this.blogs = [];
-    }
- }

- แก้ไข sortBlogs() เพื่อหลีกเลี่ยงข้อผิดพลาดในการเรียงลำดับ
- sortBlogs() {
-    this.blogs.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime());
- }

# แก้ไขโค้ดโดยเพิ่มการป้องกัน null, undefined และ localStorage ที่ผิดพลาด พร้อมตรวจสอบค่าก่อนใช้งาน


