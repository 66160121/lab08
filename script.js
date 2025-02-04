// Blog Class - รับผิดชอบจัดการข้อมูลของบล็อก
class Blog {
    constructor(id, title, content,tags = [], createdDate = new Date(),updatedDate = new Date()) {
    this.id = id;
    this.title = title;
    this.tags = tags; // เพิ่มแท็ก
    this.content = content;
    // เพิ่มตัว createdDate , updatedDate ในวง
    this.createdDate = new Date(createdDate);
    this.updatedDate = new Date(updatedDate);
    }

    update(title, content , tags) {
    this.title = title;
    this.content = content;
    this.tags = tags; // อัปเดตแท็ก
    this.updatedDate = new Date();
    }

    getFormattedDate() {
    return this.updatedDate.toLocaleString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    });
    }
    }
    // BlogManager Class - รับผิดชอบจัดการ Array ของบล็อก
    class BlogManager {
        constructor() {
            this.blogs = []; // ✅ กำหนดค่าเริ่มต้นให้ blogs เป็นอาร์เรย์
            this.loadBlogs();
        }

    addBlog(title, content, tags) {
        console.log("เพิ่มบล็อก:", title, content, tags);
        const blog = new Blog(Date.now(), title, content, tags);
        this.blogs.push(blog);
        this.sortBlogs();
        this.saveBlogs();
        return blog;
    }

    updateBlog(id, title, content, tags) {
        const blog = this.getBlog(id);
        if (blog) {
            blog.update(title, content, tags); // ✅ ต้องส่ง tags ไปด้วย
            this.sortBlogs();
            this.saveBlogs();
        }
        return blog;
    }

deleteBlog(id) {
this.blogs = this.blogs.filter((blog) => blog.id !== id);
}
getBlog(id) {
return this.blogs.find((blog) => blog.id === id);
}
sortBlogs() {
this.blogs.sort((a, b) => b.updatedDate - a.updatedDate);
}
//  เพิ่ม ตัว SaveBlogs
saveBlogs() {
    const data = this.blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        tags: blog.tags, // ✅ บันทึกแท็ก
        createdDate: blog.createdDate.toISOString(),
        updatedDate: blog.updatedDate.toISOString()
    }));
    localStorage.removeItem("blogs");
}
// เพิ่มตัว loadBlogs
loadBlogs() {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    this.blogs = storedBlogs.map(
        (blog) => new Blog(blog.id, blog.title, blog.content, blog.tags, blog.createdDate, blog.updatedDate)
    );
}
}
// UI Class - รับผิดชอบจัดการ DOM , Event
class BlogUI {
initElements() {
    this.tagInput = document.getElementById("tags"); // ช่องกรอกแท็ก
    this.filterTagInput = document.getElementById("filter-tag"); // ช่องกรองแท็ก
    this.filterTagInput.addEventListener("input", () => this.render()); // อัปเดตอัตโนมัติ
}
constructor(blogManager) {
this.blogManager = blogManager;
this.initElements();
this.initEventListeners();
this.render();
}

initElements() {
this.form = document.getElementById("blog-form");
this.titleInput = document.getElementById("title");
this.contentInput = document.getElementById("content");
this.editIdInput = document.getElementById("edit-id");
this.formTitle = document.getElementById("form-title");
this.cancelBtn = document.getElementById("cancel-btn");
this.blogList = document.getElementById("blog-list");
}
initEventListeners() {
// จัดดการsubmit form
this.form.addEventListener("submit", (e) => {
e.preventDefault();
this.handleSubmit();
});
// จัดการปุ่มยกเลิก
this.cancelBtn.addEventListener("click", () => {
this.resetForm();
});
}

handleSubmit() {
    const title = this.titleInput.value.trim();
    const content = this.contentInput.value.trim();
    const tags = this.tagInput.value.split(",").map(tag => tag.trim()).filter(tag => tag);
    const editId = parseInt(this.editIdInput.value);

    if (title && content) {
        if (editId) {
            this.blogManager.updateBlog(editId, title, content, tags); // ✅ ส่ง tags ไปด้วย
        } else {
            this.blogManager.addBlog(title, content, tags); // ✅ ส่ง tags ไปด้วย
        }
        this.resetForm();
        this.render();
    }
}

editBlog(id) {
    const blog = this.blogManager.getBlog(id);
    if (blog) {
        this.titleInput.value = blog.title;
        this.contentInput.value = blog.content;
        this.tagInput.value = blog.tags.join(", "); // ✅ เพิ่มแท็กลง input
        this.editIdInput.value = blog.id;
        this.formTitle.textContent = "แก้ไขบล็อก";
        this.cancelBtn.classList.remove("hidden");
        window.scrollTo(0, 0);
    }
}

deleteBlog(id) {
if (confirm("ต้องการลบบล็อกนี้ใช่หรือไม่")) {
this.blogManager.deleteBlog(id);
this.render();
}
}
resetForm() {
this.form.reset();
this.editIdInput.value = "";
this.formTitle.textContent = "เขียนบล็อกใหม่";
this.cancelBtn.classList.add("hidden");
}
render() {
    console.log("อัปเดต UI");
    const filterTag = this.filterTagInput.value.trim().toLowerCase();
    this.blogList.innerHTML = this.blogManager.blogs
        .filter(blog => filterTag === "" || blog.tags.some(tag => tag.toLowerCase().includes(filterTag)))
        .map(blog => `
            <div class="blog-post">
                <h2 class="blog-title">${blog.title}</h2>
                <div class="blog-date">อัพเดตเมื่อ: ${blog.getFormattedDate()}</div>
                <div class="blog-content">${blog.content.replace(/\n/g, "<br>")}</div>
                <div class="blog-tags">แท็ก: ${blog.tags.join(", ")}</div>
                <div class="blog-actions">
                    <button class="btn-edit" onclick="blogUI.editBlog(${blog.id})">แก้ไข</button>
                    <button class="btn-delete" onclick="blogUI.deleteBlog(${blog.id})">ลบ</button>
                </div>
            </div>
        `).join("");
}
    }
    // สร์าง instance แล็ะเริ่มต้นใงาน
const blogManager = new BlogManager();
const blogUI = new BlogUI(blogManager);