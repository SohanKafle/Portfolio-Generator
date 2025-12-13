// Function to validate the form
function validateForm() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    if (!name || !role || !description) {
        alert("Please fill out all required fields.");
        return false;
    }

    if (!image) {
        alert("Please upload a profile image.");
        return false;
    }

    const fileType = image.type.split("/")[0];
    if (fileType !== "image") {
        alert("Please upload a valid image file.");
        return false;
    }

    const urlPattern = /^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/;
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;

    if (github && !urlPattern.test(github)) {
        alert("Please enter a valid GitHub URL.");
        return false;
    }
    if (instagram && !urlPattern.test(instagram)) {
        alert("Please enter a valid Instagram URL.");
        return false;
    }
    if (linkedin && !urlPattern.test(linkedin)) {
        alert("Please enter a valid LinkedIn URL.");
        return false;
    }
    if (twitter && !urlPattern.test(twitter)) {
        alert("Please enter a valid Twitter URL.");
        return false;
    }

    return true;
}

// Function to preview image in the form
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.classList.remove('hidden');
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to generate portfolio preview in a new tab
function generatePortfolio(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById('name').value;
    const firstName = name.split(' ')[0];
    const roles = document.getElementById('role').value.trim().split(',').map(role => role.trim());
    const description = document.getElementById('description').value;
    const github = document.getElementById('github').value;
    const instagram = document.getElementById('instagram').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageDataURL = e.target.result;

        const newTab = window.open("", "_blank");

        newTab.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${firstName}'s Portfolio</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        accent: '#fbbf24',
                    }
                }
            }
        }
    <\/script>
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
    <!-- Fixed Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-slate-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <!-- Logo -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 dark:text-yellow-400" style="font-family: 'Dancing Script', cursive; letter-spacing: 1px;">
                ${firstName}.
            </h1>
            
            <!-- Dark Mode Toggle -->
            <button 
                id="toggle-dark-mode" 
                class="relative w-16 h-8 rounded-full bg-gray-300 dark:bg-indigo-600 shadow-inner transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                <div class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 dark:translate-x-8 flex items-center justify-center">
                    <span id="moon-icon" class="text-sm block dark:hidden">🌙</span>
                    <span id="sun-icon" class="text-sm hidden dark:block">☀️</span>
                </div>
            </button>
        </div>
    </nav>

    <!-- Main Container with top padding to account for fixed nav -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 pt-24 sm:pt-28 lg:pt-32">

        <!-- Profile Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <!-- Profile Image -->
            <div class="flex justify-center lg:justify-start order-1">
                <div class="relative group">
                    <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                        <img 
                            src="${imageDataURL}" 
                            alt="Profile Picture" 
                            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        >
                    </div>
                </div>
            </div>

            <!-- Profile Info -->
            <div class="text-center lg:text-left order-2 space-y-6">
                <div>
                    <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">
                        Hi, I'm <span class="text-blue-600 dark:text-blue-400 font-semibold text-xl sm:text-2xl">${name}</span>
                    </p>
                    <div class="flex items-center justify-center lg:justify-start gap-2 mb-4 flex-wrap">
                        <span class="text-2xl sm:text-3xl text-gray-800 dark:text-white">a</span>
                        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 min-h-[3rem]">
                            <span id="roleText"></span>
                        </h2>
                    </div>
                </div>

                <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                    ${description}
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                    <button 
                        id="downloadBtn"
                        class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        Download Portfolio
                    </button>
                    <a 
                        href="#contact"
                        class="px-8 py-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 dark:border-slate-700"
                    >
                        Contact Me
                    </a>
                </div>

                <!-- Social Links -->
                <div class="flex gap-6 justify-center lg:justify-start pt-6 flex-wrap">
                    ${github ? `
                        <a href="${github}" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 dark:bg-slate-700 text-white hover:bg-gray-700 dark:hover:bg-slate-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
                            <i class="fab fa-github text-xl"></i>
                        </a>
                    ` : ''}
                    ${instagram ? `
                        <a href="${instagram}" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white transform hover:scale-110 transition-all duration-300 shadow-lg">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    ` : ''}
                    ${linkedin ? `
                        <a href="${linkedin}" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                    ` : ''}
                    ${twitter ? `
                        <a href="${twitter}" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 transform hover:scale-110 transition-all duration-300 shadow-lg">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-8 border-t border-gray-200 dark:border-slate-700 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-600 dark:text-gray-400 mb-2">
                &copy; 2024 ${name}. All rights reserved.
            </p>
            <p class="text-gray-500 dark:text-gray-400">
                Thanks for visiting ❤️
            </p>
        </div>
    </footer>
    
    <script>
    // Typing effect for roles
    const roles = ${JSON.stringify(roles)};
    let roleIndex = 0, charIndex = 0;
    const roleElement = document.getElementById('roleText');

    function typeEffect() {
        if (charIndex < roles[roleIndex].length) {
            roleElement.textContent += roles[roleIndex].charAt(charIndex++);
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(() => {
                charIndex = 0;
                roleElement.textContent = '';
                roleIndex = (roleIndex + 1) % roles.length;
                typeEffect();
            }, 1000);
        }
    }
    typeEffect();
    
    // Dark mode toggle
    const toggleBtn = document.getElementById('toggle-dark-mode');
    const html = document.documentElement;
    
    // Start in light mode by default
    // Check for saved preference (optional)
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        html.classList.add('dark');
    }
    
    toggleBtn.addEventListener('click', function () {
        html.classList.toggle('dark');
        localStorage.setItem('darkMode', html.classList.contains('dark'));
    });

    // Download portfolio
    document.getElementById('downloadBtn').addEventListener('click', function () {
        const portfolioHTML = document.documentElement.outerHTML;
        const zip = new JSZip();
        zip.file("index.html", portfolioHTML);
        zip.generateAsync({ type: "blob" }).then(function (content) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = "portfolio.zip";
            link.click();
        });
    });
    <\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"><\/script>
          
    <!-- 
        Feel free to update the code as per your need. 
        ❤️ From Sohan Kafle. Happy Coding.
    -->  
    
</body>
</html>
        `);
    };

    if (image) {
        reader.readAsDataURL(image);
    }
}

// Event listener for the form submission
document.getElementById('portfolioForm').addEventListener('submit', generatePortfolio);

// Event listener for the image preview
document.getElementById('image').addEventListener('change', previewImage);
