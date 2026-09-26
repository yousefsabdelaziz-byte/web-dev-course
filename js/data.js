// =============================================
// PLATFORM DATA & STATE MANAGEMENT
// =============================================

const COURSE_DATA = {
  name: "Web Development Course — First Round",
  nameAr: "دورة تطوير الويب المتكاملة",
  instructor: "Eng. Yousef S Abdelaziz",
  startDate: "01/10/2026",
  totalLectures: 12,
  weeksCount: 4,
  lecturesPerWeek: 3,

  lectures: [
    {
      id: 1, week: 1,
      title: "HTML Basics",
      titleAr: "أساسيات HTML",
      tag: "html",
      desc: "Introduction to HTML — the language that structures the web.",
      descAr: "مقدمة إلى HTML — اللغة التي تُبنى بها صفحات الويب.",
      duration: "~60 min",
      videoUrl: "https://drive.google.com/file/d/1G1KYC5wpcbjBh6m4acjv99hfP4Eo4sjO/preview",
      materialUrl: "https://drive.google.com/file/d/1kgncEou2D6H1Asq6NESU7CDWnfjqE632/view",
      objectives: [
        "Understand what HTML is and how browsers read it",
        "Learn the basic structure of an HTML document",
        "Use common HTML tags: headings, paragraphs, links, images",
        "Understand the difference between block and inline elements"
      ],
      content: `HTML (HyperText Markup Language) is the standard language for creating web pages. Every web page you visit is built with HTML. HTML uses <em>elements</em> represented by tags to structure content.

An HTML document always starts with a DOCTYPE declaration, followed by the html, head, and body elements. The head contains meta-information while the body contains the visible content.`,
      codeExample: {
        lang: "HTML",
        code: `<!DOCTYPE html>\n<html lang="ar">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>مرحباً بالعالم!</h1>\n  <p>هذه أول صفحة ويب لي.</p>\n  <a href="https://example.com">اضغط هنا</a>\n</body>\n</html>`
      },
      task: {
        title: "Build Your First HTML Page",
        titleAr: "ابنِ أول صفحة HTML لك",
        desc: "Create a simple HTML page about yourself. Include a title, your name, a short bio, and a link.",
        descAr: "أنشئ صفحة HTML بسيطة عن نفسك. اذكر عنواناً، اسمك، نبذة قصيرة، ورابطاً.",
        requirements: [
          "Use proper HTML document structure (DOCTYPE, html, head, body)",
          "Add a heading (h1) with your name",
          "Write 2–3 paragraphs about yourself",
          "Include at least one link and one image",
          "Save the file as index.html and open it in a browser"
        ]
      },
      materials: []
    },
    {
      id: 2, week: 1,
      title: "HTML Elements & Tags",
      titleAr: "عناصر وعلامات HTML",
      tag: "html",
      videoUrl: "https://drive.google.com/file/d/1_sucHpCGysp6opKUJDfQ-z4NybpgChbD/preview",
      materialUrl: "https://drive.google.com/file/d/1e0K4OPsoEWU1WHRFTVhoQG1x_s-sLNqT/view",
      desc: "Deep dive into HTML elements, semantic tags, lists, and media.",
      descAr: "تعمق في عناصر HTML، العلامات الدلالية، القوائم، والوسائط.",
      duration: "~65 min",
      objectives: [
        "Use semantic HTML5 tags (header, nav, main, section, footer)",
        "Create ordered and unordered lists",
        "Embed images and videos",
        "Understand HTML attributes and their purpose"
      ],
      content: `Semantic HTML uses meaningful elements that describe their content's role. Instead of using generic divs everywhere, semantic tags like header, nav, article, and footer tell both the browser and developers what each section does.

Good semantic HTML improves accessibility, SEO, and code readability. Always prefer semantic elements over non-semantic ones.`,
      codeExample: {
        lang: "HTML",
        code: `<header>\n  <nav>\n    <ul>\n      <li><a href="#home">Home</a></li>\n      <li><a href="#about">About</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <section id="home">\n    <h1>Welcome</h1>\n    <p>This is the main content area.</p>\n  </section>\n  <article>\n    <h2>Blog Post Title</h2>\n    <p>Article content goes here...</p>\n  </article>\n</main>\n<footer>\n  <p>&copy; 2026 My Website</p>\n</footer>`
      },
      task: {
        title: "Semantic HTML Page",
        titleAr: "صفحة HTML دلالية",
        desc: "Build a page using semantic HTML tags. Create a navigation bar, main content section, and a footer.",
        descAr: "ابنِ صفحة باستخدام علامات HTML الدلالية. أنشئ شريط تنقل وقسم محتوى رئيسي وتذييلاً.",
        requirements: [
          "Use header, nav, main, section, article, and footer",
          "Create an unordered navigation list",
          "Add an image with proper alt text",
          "Include a footer with copyright info"
        ]
      },
      materials: []
    },
    {
      id: 3, week: 1,
      title: "Forms & Tables + HTML Project",
      titleAr: "النماذج والجداول + مشروع HTML",
      tag: "html",
      materialUrl: "https://drive.google.com/file/d/10vKA8smGsCAXlg0jBiE6snrq6xwM5BGZ/view",
      desc: "Master HTML forms, tables, and build a complete HTML mini-project.",
      descAr: "أتقن نماذج HTML والجداول وابنِ مشروع HTML صغير كامل.",
      duration: "~90 min",
      objectives: [
        "Build complete HTML forms with various input types",
        "Create and style HTML tables",
        "Understand form validation attributes",
        "Build a complete multi-page HTML project"
      ],
      content: `HTML forms are how users interact with web applications — login forms, search bars, contact forms, registrations. They use the <form> element along with input, select, textarea, and button elements.

Tables are used to display structured, tabular data. They consist of rows (tr), header cells (th), and data cells (td). Always use tables for data, not for layout!`,
      codeExample: {
        lang: "HTML",
        code: `<form action="/submit" method="POST">\n  <label for="name">الاسم:</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="email">البريد الإلكتروني:</label>\n  <input type="email" id="email" name="email" required>\n\n  <label for="message">الرسالة:</label>\n  <textarea id="message" name="message" rows="4"></textarea>\n\n  <button type="submit">إرسال</button>\n</form>`
      },
      task: {
        title: "Contact Page with Form",
        titleAr: "صفحة تواصل مع نموذج",
        desc: "Build a complete contact page with a form that includes name, email, phone, and message fields. Add a table showing a weekly schedule.",
        descAr: "ابنِ صفحة تواصل كاملة مع نموذج يشتمل على حقول الاسم والبريد والهاتف والرسالة. أضف جدولاً يوضح جدولاً أسبوعياً.",
        requirements: [
          "Form with at least 4 input fields and a submit button",
          "Use proper label elements for accessibility",
          "Add required attribute validation",
          "Create a table with headers and at least 3 rows",
          "Link all pages together with navigation"
        ]
      },
      materials: []
    },
    {
      id: 4, week: 2,
      title: "CSS Basics",
      titleAr: "أساسيات CSS",
      tag: "css",
      materialUrl: "https://drive.google.com/file/d/1VKu1qpzGUdC4XGn4ipVGr7-SSdp30UwD/view",
      desc: "Introduction to CSS — colors, fonts, backgrounds, and styling your HTML.",
      descAr: "مقدمة إلى CSS — الألوان والخطوط والخلفيات وتنسيق HTML.",
      duration: "~70 min",
      objectives: [
        "Understand what CSS is and how it connects to HTML",
        "Write CSS rules: selectors, properties, values",
        "Work with colors, fonts, and backgrounds",
        "Understand CSS specificity and cascade"
      ],
      content: `CSS (Cascading Style Sheets) controls the visual presentation of HTML. While HTML provides structure, CSS provides style — colors, fonts, spacing, layout, and more.

CSS works through rules: a selector targets HTML elements, and declarations (property: value pairs) define how they look. There are three ways to add CSS: inline, internal (style tag), and external (stylesheet file). External stylesheets are the best practice.`,
      codeExample: {
        lang: "CSS",
        code: `/* External stylesheet — styles.css */\n\nbody {\n  font-family: 'Cairo', sans-serif;\n  background-color: #0a0f1e;\n  color: #ffffff;\n  margin: 0;\n  padding: 0;\n}\n\nh1 {\n  color: #3b82f6;\n  font-size: 2rem;\n  margin-bottom: 16px;\n}\n\n.card {\n  background: rgba(255, 255, 255, 0.07);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 12px;\n  padding: 24px;\n}`
      },
      task: {
        title: "Style Your HTML Page",
        titleAr: "نسِّق صفحة HTML الخاصة بك",
        desc: "Take your HTML page from the previous lectures and add a CSS stylesheet. Style the colors, fonts, and spacing.",
        descAr: "خذ صفحة HTML من المحاضرات السابقة وأضف إليها ملف CSS. نسِّق الألوان والخطوط والمسافات.",
        requirements: [
          "Create a separate styles.css file and link it",
          "Set a background color and font for the body",
          "Style headings with custom colors and sizes",
          "Add padding and margin to sections",
          "Style the navigation links"
        ]
      },
      materials: []
    },
    {
      id: 5, week: 2,
      title: "Selectors, Properties & Box Model",
      titleAr: "المحددات والخصائص ونموذج الصندوق",
      tag: "css",
      materialUrl: "https://drive.google.com/file/d/1ZRFd5Y39iVUNFTeQcHE5SGR0LJXvDqsL/view",
      desc: "Master CSS selectors, the box model, and core layout properties.",
      descAr: "أتقن محددات CSS ونموذج الصندوق وخصائص التخطيط الأساسية.",
      duration: "~75 min",
      objectives: [
        "Use class, ID, attribute, and pseudo-class selectors",
        "Understand the CSS Box Model (margin, border, padding, content)",
        "Work with width, height, and overflow",
        "Use border, border-radius, and box-shadow"
      ],
      content: `The CSS Box Model is fundamental to understanding layout. Every HTML element is a box with four areas: content, padding (space inside the border), border, and margin (space outside the border).

Understanding how these layers interact is key to controlling spacing and layout. The box-sizing: border-box property makes width calculations much more intuitive and is standard practice today.`,
      codeExample: {
        lang: "CSS",
        code: `/* Box Model Example */\n.card {\n  /* Content area */\n  width: 300px;\n  \n  /* Inner spacing */\n  padding: 20px;\n  \n  /* Border */\n  border: 2px solid #3b82f6;\n  border-radius: 12px;\n  \n  /* Outer spacing */\n  margin: 16px;\n  \n  /* Include padding/border in width */\n  box-sizing: border-box;\n  \n  /* Shadow */\n  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);\n}`
      },
      task: {
        title: "Box Model Practice",
        titleAr: "تطبيق على نموذج الصندوق",
        desc: "Create a profile card using the box model. Style it with padding, border, margin, and border-radius.",
        descAr: "أنشئ بطاقة ملف شخصي باستخدام نموذج الصندوق. نسِّقها بالحشو والحدود والهوامش.",
        requirements: [
          "Create a centered card with fixed width",
          "Add proper padding inside the card",
          "Use border and border-radius for rounded corners",
          "Add a box-shadow for depth",
          "Use pseudo-classes (:hover) to change the card on hover"
        ]
      },
      materials: []
    },
    {
      id: 6, week: 2,
      title: "Flexbox, Grid & Responsive Design",
      titleAr: "Flexbox وGrid والتصميم المتجاوب",
      tag: "css",
      materialUrl: "https://drive.google.com/file/d/1rkCzMRjZda5mQGiIqTBF2-P7zlHEbg5o/view",
      desc: "Learn modern CSS layout with Flexbox, Grid, and media queries.",
      descAr: "تعلم تخطيط CSS الحديث باستخدام Flexbox وGrid واستعلامات الوسائط.",
      duration: "~90 min",
      objectives: [
        "Use Flexbox for one-dimensional layouts",
        "Use CSS Grid for two-dimensional layouts",
        "Write media queries for responsive design",
        "Build a fully responsive page that works on mobile and desktop"
      ],
      content: `Flexbox and Grid are the two main modern CSS layout systems. Flexbox is ideal for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts (rows and columns simultaneously).

Media queries allow you to apply different styles at different screen sizes, enabling responsive design. The mobile-first approach — starting with mobile styles and adding larger breakpoints — is the industry standard.`,
      codeExample: {
        lang: "CSS",
        code: `/* Flexbox */\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 24px;\n}\n\n/* Grid */\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n/* Media Query */\n@media (max-width: 768px) {\n  .navbar {\n    flex-direction: column;\n    gap: 12px;\n  }\n}`
      },
      task: {
        title: "Responsive Landing Page",
        titleAr: "صفحة هبوط متجاوبة",
        desc: "Build a responsive landing page using Flexbox for the navbar and Grid for the cards section. It must look good on both mobile and desktop.",
        descAr: "ابنِ صفحة هبوط متجاوبة باستخدام Flexbox لشريط التنقل وGrid لقسم البطاقات. يجب أن تبدو جيدة على الموبايل والديسكتوب.",
        requirements: [
          "Flexbox navbar with logo and links",
          "Hero section with centered content",
          "Cards grid that collapses to 1 column on mobile",
          "Media query for screens below 768px",
          "Footer with flexbox layout"
        ]
      },
      materials: []
    },
    {
      id: 7, week: 3,
      title: "JavaScript Basics",
      titleAr: "أساسيات JavaScript",
      tag: "js",
      materialUrl: "https://drive.google.com/file/d/1WQJZau_XPr2uZU4i1OUddnDoNAOWmpeV/view",
      desc: "Introduction to JavaScript — making your web pages interactive.",
      descAr: "مقدمة إلى JavaScript — إضافة التفاعل لصفحات الويب.",
      duration: "~75 min",
      objectives: [
        "Understand what JavaScript is and how it runs in the browser",
        "Write your first JavaScript code",
        "Use console.log to debug",
        "Understand script tags and where to place them"
      ],
      content: `JavaScript (JS) is the programming language of the web. While HTML structures the content and CSS styles it, JavaScript makes it interactive and dynamic. Every modern website uses JavaScript.

JavaScript runs directly in the browser — no installation needed. You can write JS inside a script tag in HTML or in separate .js files. The browser's developer console (F12) is your best friend for testing and debugging.`,
      codeExample: {
        lang: "JavaScript",
        code: `// Your first JavaScript!\nconsole.log("مرحباً بالعالم!");\n\n// Variables\nlet name = "Yousef";\nconst course = "Web Development";\n\n// Output to page\ndocument.querySelector("h1").textContent = "Hello, " + name;\n\n// Alert\nalert("Welcome to " + course + "!");\n\n// Basic math\nlet price = 100;\nlet discount = 20;\nlet total = price - discount;\nconsole.log("Total: " + total);`
      },
      task: {
        title: "Your First JavaScript",
        titleAr: "أول كود JavaScript لك",
        desc: "Add JavaScript to your HTML page. Display a welcome message, show the current date, and change the page title dynamically.",
        descAr: "أضف JavaScript إلى صفحتك. اعرض رسالة ترحيب وأظهر التاريخ الحالي وغيِّر عنوان الصفحة ديناميكياً.",
        requirements: [
          "Link a separate script.js file to your HTML",
          "Display a greeting using document.querySelector",
          "Show today's date using the Date object",
          "Change a CSS class using classList",
          "Use console.log for at least 3 different values"
        ]
      },
      materials: []
    },
    {
      id: 8, week: 3,
      title: "Variables, Data Types, Conditions & Loops",
      titleAr: "المتغيرات وأنواع البيانات والشروط والحلقات",
      tag: "js",
      materialUrl: "https://drive.google.com/file/d/1PKakrn8GykVO_Wdgw51v4bSixTIp797z/view",
      desc: "Core JavaScript programming: variables, data types, if/else, and loops.",
      descAr: "برمجة JavaScript الأساسية: المتغيرات وأنواع البيانات والشروط والحلقات.",
      duration: "~80 min",
      objectives: [
        "Use let, const, and var correctly",
        "Understand JS data types: string, number, boolean, null, undefined",
        "Write conditional logic with if/else and switch",
        "Use for, while, and for...of loops"
      ],
      content: `Variables are containers for storing data values. In modern JavaScript we use let (for values that can change) and const (for values that shouldn't change). Avoid using var as it has scoping issues.

Conditionals let your code make decisions. Loops let your code repeat actions. These two concepts — together with variables and functions — form the foundation of all programming.`,
      codeExample: {
        lang: "JavaScript",
        code: `// Variables & Data Types\nlet studentName = "Ahmed";     // string\nconst score = 95;              // number\nlet isPassed = score >= 60;    // boolean\n\n// Conditional\nif (score >= 90) {\n  console.log("Excellent! ممتاز");\n} else if (score >= 70) {\n  console.log("Good! جيد");\n} else {\n  console.log("Keep trying! واصل المحاولة");\n}\n\n// Loop — print 1 to 5\nfor (let i = 1; i <= 5; i++) {\n  console.log("Number: " + i);\n}\n\n// Array loop\nconst lectures = ["HTML", "CSS", "JS"];\nfor (const lecture of lectures) {\n  console.log("Lecture: " + lecture);\n}`
      },
      task: {
        title: "Grade Calculator",
        titleAr: "حاسبة الدرجات",
        desc: "Build a grade calculator. Ask the user for their score, then display their grade (A, B, C, D, F) and a message.",
        descAr: "ابنِ حاسبة درجات. اطلب من المستخدم درجته ثم اعرض تقديره (A, B, C, D, F) مع رسالة.",
        requirements: [
          "Use prompt() to get the score from the user",
          "Use if/else if chain to determine the grade",
          "Display the result using innerHTML",
          "Use a loop to show all passing scores (60-100)",
          "Handle invalid input with a message"
        ]
      },
      materials: []
    },
    {
      id: 9, week: 3,
      title: "Functions, Arrays & Objects",
      titleAr: "الدوال والمصفوفات والكائنات",
      tag: "js",
      materialUrl: "https://drive.google.com/file/d/14hudFUfX01srvMLwHSghOP04Y2bjUJNs/view",
      desc: "Write reusable functions, work with arrays and objects in JavaScript.",
      descAr: "اكتب دوالاً قابلة لإعادة الاستخدام واعمل مع المصفوفات والكائنات.",
      duration: "~85 min",
      objectives: [
        "Write and call functions with parameters and return values",
        "Use arrow functions",
        "Work with arrays: push, pop, map, filter, find",
        "Create and access JavaScript objects"
      ],
      content: `Functions are reusable blocks of code. Instead of repeating the same code, you write a function once and call it wherever needed. Functions can accept parameters (inputs) and return values (outputs).

Arrays store ordered lists of values. Objects store key-value pairs. Together, they are how real-world data is modeled in JavaScript — a list of students is an array of student objects.`,
      codeExample: {
        lang: "JavaScript",
        code: `// Function\nfunction greetStudent(name, score) {\n  return \`Hello \${name}! Your score: \${score}\`;\n}\n\n// Arrow Function\nconst add = (a, b) => a + b;\n\n// Array methods\nconst scores = [85, 92, 78, 96, 60];\nconst passing = scores.filter(s => s >= 70);\nconst doubled = scores.map(s => s * 2);\n\n// Object\nconst student = {\n  name: "Sara",\n  age: 22,\n  score: 92,\n  isPassed: true,\n  greet() {\n    return \`Hi, I'm \${this.name}\`;\n  }\n};\n\nconsole.log(student.greet());`
      },
      task: {
        title: "Student Records App",
        titleAr: "تطبيق سجلات الطلاب",
        desc: "Create a student records system. Store 5 students in an array of objects, then display them on the page with their grade.",
        descAr: "أنشئ نظام سجلات طلاب. خزِّن 5 طلاب في مصفوفة من الكائنات ثم اعرضهم على الصفحة مع درجاتهم.",
        requirements: [
          "Create an array of at least 5 student objects",
          "Each student has: name, score, and email",
          "Write a function to calculate the grade",
          "Display all students in an HTML table using a loop",
          "Highlight the top scorer with a different style"
        ]
      },
      materials: []
    },
    {
      id: 10, week: 4,
      title: "DOM & Events",
      titleAr: "DOM والأحداث",
      tag: "js",
      materialUrl: "https://drive.google.com/file/d/1ETnQ-7UN7l1txBKlWTCaccjlIFQhwJ63/view",
      desc: "Manipulate the DOM and respond to user events to build interactive UIs.",
      descAr: "تلاعب في DOM واستجب لأحداث المستخدم لبناء واجهات تفاعلية.",
      duration: "~90 min",
      objectives: [
        "Select and modify DOM elements",
        "Create and remove elements dynamically",
        "Handle click, input, submit, and keyboard events",
        "Build interactive UI components (toggle, counter, form validation)"
      ],
      content: `The DOM (Document Object Model) is the browser's JavaScript representation of the HTML page. Through the DOM, JavaScript can read, create, modify, and delete any element on the page in real-time.

Events are things that happen in the browser: a user clicks a button, types in a field, submits a form, or scrolls the page. JavaScript event listeners let you run code in response to these events.`,
      codeExample: {
        lang: "JavaScript",
        code: `// Select elements\nconst btn = document.querySelector("#myBtn");\nconst list = document.querySelector("#list");\nconst input = document.querySelector("#taskInput");\n\n// Click event\nbtn.addEventListener("click", () => {\n  const text = input.value.trim();\n  if (!text) return;\n\n  // Create new element\n  const li = document.createElement("li");\n  li.textContent = text;\n  li.classList.add("task-item");\n\n  // Add click to remove\n  li.addEventListener("click", () => li.remove());\n\n  list.appendChild(li);\n  input.value = "";\n});`
      },
      task: {
        title: "Interactive To-Do List",
        titleAr: "قائمة مهام تفاعلية",
        desc: "Build a working to-do list app with DOM manipulation. Users can add, complete, and delete tasks.",
        descAr: "ابنِ تطبيق قائمة مهام تفاعلي باستخدام DOM. يمكن للمستخدمين إضافة المهام وإكمالها وحذفها.",
        requirements: [
          "Input field and add button",
          "Display tasks dynamically using createElement",
          "Click task to mark as complete (strikethrough)",
          "Delete button for each task",
          "Show task count (total and completed)"
        ]
      },
      materials: []
    },
    {
      id: 11, week: 4,
      title: "Git & GitHub + Final Project Start",
      titleAr: "Git وGitHub + بداية المشروع النهائي",
      tag: "git",
      materialUrl: "https://drive.google.com/file/d/1vpaYkKb9_tjNoI7egB30M7tP9Zozyi6R/view",
      desc: "Learn version control with Git and GitHub, then start your final project.",
      descAr: "تعلم التحكم في الإصدارات مع Git وGitHub ثم ابدأ مشروعك النهائي.",
      duration: "~80 min",
      objectives: [
        "Understand what version control is and why it matters",
        "Initialize a Git repository and make commits",
        "Create a GitHub account and upload a project",
        "Understand branching and basic Git workflow"
      ],
      content: `Git is a version control system that tracks changes in your code. Think of it as a save system for your project — you can go back to any previous version, work on features without breaking the main code, and collaborate with others.

GitHub is a platform that hosts Git repositories online. It's where developers share code, collaborate on projects, and showcase their work. Having a GitHub profile is essential for any web developer.`,
      codeExample: {
        lang: "Bash",
        code: `# Initialize a new repository\ngit init\n\n# Check status\ngit status\n\n# Add files to staging\ngit add .\n\n# Commit with a message\ngit commit -m "Initial commit — add HTML structure"\n\n# Connect to GitHub\ngit remote add origin https://github.com/username/repo.git\n\n# Push to GitHub\ngit push -u origin main\n\n# Check commit history\ngit log --oneline`
      },
      task: {
        title: "Upload Your Project to GitHub",
        titleAr: "ارفع مشروعك على GitHub",
        desc: "Create a GitHub account, create a new repository, and upload all your previous HTML/CSS/JS work to it.",
        descAr: "أنشئ حساب GitHub وأنشئ مستودعاً جديداً وارفع كل أعمالك السابقة من HTML وCSS وJS إليه.",
        requirements: [
          "Create a GitHub account if you don't have one",
          "Create a new public repository named 'web-dev-course'",
          "Initialize git in your project folder",
          "Add and commit all your files",
          "Push to GitHub and share the repo link"
        ]
      },
      materials: []
    },
    {
      id: 12, week: 4,
      title: "Deployment + Publishing the Project Online",
      titleAr: "النشر + تحميل المشروع على الإنترنت",
      tag: "deploy",
      materialUrl: "https://drive.google.com/file/d/1lw0O1p0dj_oeHbbjk7Kc3CHJU1SKcfvq/view",
      desc: "Deploy your final project online and share it with the world.",
      descAr: "انشر مشروعك النهائي على الإنترنت وشاركه مع العالم.",
      duration: "~75 min",
      objectives: [
        "Understand what web deployment means",
        "Deploy a static website using GitHub Pages",
        "Understand domain names and hosting basics",
        "Share your live project link"
      ],
      content: `Deployment is the process of making your website accessible to anyone on the internet. For static websites (HTML, CSS, JS), you can deploy for free using GitHub Pages, Netlify, or Vercel.

GitHub Pages is the simplest option — you push your code to a GitHub repository and GitHub hosts it automatically at username.github.io/repo-name. No server configuration required!`,
      codeExample: {
        lang: "Bash",
        code: `# Step 1: Make sure your code is pushed to GitHub\ngit add .\ngit commit -m "Final project — ready for deployment"\ngit push origin main\n\n# Step 2: Go to GitHub repo settings\n# Settings > Pages > Source > Deploy from branch\n# Choose 'main' branch and '/ (root)'\n# Click Save\n\n# Your site will be live at:\n# https://username.github.io/repo-name\n\n# Step 3: Wait 1-2 minutes for deployment\n# Visit your live URL!`
      },
      task: {
        title: "Deploy Your Final Project",
        titleAr: "انشر مشروعك النهائي",
        desc: "Deploy your complete web project to GitHub Pages. Share the live link with the instructor.",
        descAr: "انشر مشروعك على GitHub Pages وشارك الرابط الحي مع المدرب.",
        requirements: [
          "Final project pushed to GitHub",
          "GitHub Pages enabled on the repository",
          "Website loads correctly at the live URL",
          "All pages and links work correctly",
          "Submit your live URL and GitHub repo link"
        ]
      },
      materials: []
    }
  ]
};

// =============================================
// STATE MANAGER (localStorage backed)
// =============================================
const State = {
  _get(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  _set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  // AUTH
  getCurrentUser() { return this._get('wdc_current_user'); },
  setCurrentUser(u) { this._set('wdc_current_user', u); },
  logout() { localStorage.removeItem('wdc_current_user'); },

  // USERS DB
  getUsers() { return this._get('wdc_users') || []; },
  saveUsers(users) { this._set('wdc_users', users); },

  getUserById(id) {
    return this.getUsers().find(u => u.id === id) || null;
  },

  registerUser(data) {
    const users = this.getUsers();
    if (users.find(u => u.email === data.email)) return { ok: false, msg: 'البريد الإلكتروني مسجل مسبقاً' };
    const user = {
      id: 'u_' + Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'student',
      joinDate: new Date().toLocaleDateString('ar-EG'),
      progress: {},
      taskSubmissions: {}
    };
    users.push(user);
    this.saveUsers(users);
    return { ok: true, user };
  },

  loginUser(email, password) {
    // Admin check
    if (email === 'admin@webdev.com' && password === 'admin123') {
      return { ok: true, user: { id: 'admin', name: 'Eng. Yousef S Abdelaziz', email, role: 'admin' } };
    }
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, msg: 'البريد أو كلمة المرور غير صحيحة' };
    return { ok: true, user };
  },

  // PROGRESS
  getProgress(userId) {
    const user = this.getUserById(userId);
    return user ? (user.progress || {}) : {};
  },

  markLectureComplete(userId, lectureId) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    if (!users[idx].progress) users[idx].progress = {};
    users[idx].progress[lectureId] = true;
    this.saveUsers(users);
  },

  getCompletedCount(userId) {
    const prog = this.getProgress(userId);
    return Object.values(prog).filter(Boolean).length;
  },

  getProgressPct(userId) {
    const done = this.getCompletedCount(userId);
    return Math.round((done / COURSE_DATA.totalLectures) * 100);
  },

  // TASKS
  submitTask(userId, lectureId, submissionUrl, note) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    if (!users[idx].taskSubmissions) users[idx].taskSubmissions = {};
    users[idx].taskSubmissions[lectureId] = {
      url: submissionUrl,
      note: note,
      date: new Date().toLocaleDateString('ar-EG'),
      status: 'submitted'
    };
    this.saveUsers(users);
  },

  getTaskStatus(userId, lectureId) {
    const user = this.getUserById(userId);
    if (!user || !user.taskSubmissions) return 'pending';
    const sub = user.taskSubmissions[lectureId];
    return sub ? sub.status : 'pending';
  },

  getTaskSubmission(userId, lectureId) {
    const user = this.getUserById(userId);
    if (!user || !user.taskSubmissions) return null;
    return user.taskSubmissions[lectureId] || null;
  },

  // ADMIN: update task status
  updateTaskStatus(userId, lectureId, status) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    if (!users[idx].taskSubmissions) users[idx].taskSubmissions = {};
    if (!users[idx].taskSubmissions[lectureId]) users[idx].taskSubmissions[lectureId] = {};
    users[idx].taskSubmissions[lectureId].status = status;
    this.saveUsers(users);
  },

  // VISIBILITY — hide/show lectures, tasks, videos temporarily (Firebase-backed)
  getHidden() { return this._get('wdc_hidden') || {}; },

  async toggleHiddenFirebase(type, id) {
    const key = type + '_' + id;
    const hidden = this.getHidden();
    if (hidden[key]) {
      delete hidden[key];
    } else {
      hidden[key] = true;
    }
    this._set('wdc_hidden', hidden);

    // Sync to Firebase
    try {
      if (typeof window.syncHiddenToFirebase === 'function') {
        await window.syncHiddenToFirebase(hidden);
      }
    } catch(e) { console.log('Firebase sync error:', e); }
  },

  toggleHidden(type, id) {
    this.toggleHiddenFirebase(type, id);
  },

  isHidden(type, id) {
    const hidden = this.getHidden();
    return !!hidden[type + '_' + id];
  },

  // SUPPORT MESSAGES
  getMessages() { return this._get('wdc_messages') || []; },
  addMessage(msg) {
    const msgs = this.getMessages();
    msgs.push({ ...msg, id: 'msg_' + Date.now(), date: new Date().toLocaleDateString('ar-EG'), read: false });
    this._set('wdc_messages', msgs);
  },
  markMessageRead(id) {
    const msgs = this.getMessages();
    const idx = msgs.findIndex(m => m.id === id);
    if (idx !== -1) { msgs[idx].read = true; this._set('wdc_messages', msgs); }
  }
};
