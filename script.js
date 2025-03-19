// Alert on Sign Up Button Click
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function() {
        alert("Sign Up feature coming soon!");
    });
});

// Function to Make a Window Draggable
function makeDraggable(windowElement, titleBar) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - windowElement.offsetLeft;
        offsetY = event.clientY - windowElement.offsetTop;
        event.preventDefault(); // Prevents text selection while dragging
    });

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Prevent dragging outside the screen
        let maxX = window.innerWidth - windowElement.offsetWidth;
        let maxY = window.innerHeight - windowElement.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        windowElement.style.left = `${newX}px`;
        windowElement.style.top = `${newY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

// Apply Draggable Function to Both Windows
const mainWindow = document.querySelector(".window");
const mainTitleBar = document.querySelector(".window .title-bar");

const nestedWindow = document.querySelector(".nested-window");
const nestedTitleBar = document.querySelector(".nested-window .title-bar");

makeDraggable(mainWindow, mainTitleBar);
makeDraggable(nestedWindow, nestedTitleBar);

// Function to Make a Window Resizable
function makeResizable(windowElement) {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    // Avoid adding multiple resize handles
    if (windowElement.querySelector(".resize-handle")) return;

    // Create a Resize Handle
    let resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.style.width = "10px";
    resizeHandle.style.height = "10px";
    resizeHandle.style.background = "black";
    resizeHandle.style.position = "absolute";
    resizeHandle.style.bottom = "0";
    resizeHandle.style.right = "0";
    resizeHandle.style.cursor = "nwse-resize";
    windowElement.appendChild(resizeHandle);

    // Start Resizing
    resizeHandle.addEventListener("mousedown", (event) => {
        isResizing = true;
        startX = event.clientX;
        startY = event.clientY;
        startWidth = windowElement.offsetWidth;
        startHeight = windowElement.offsetHeight;
        event.preventDefault();
    });

    // Handle Resizing
    document.addEventListener("mousemove", (event) => {
        if (!isResizing) return;

        let newWidth = startWidth + (event.clientX - startX);
        let newHeight = startHeight + (event.clientY - startY);

        // Prevent resizing below a minimum size
        newWidth = Math.max(200, newWidth);
        newHeight = Math.max(150, newHeight);

        windowElement.style.width = `${newWidth}px`;
        windowElement.style.height = `${newHeight}px`;
    });

    // Stop Resizing
    document.addEventListener("mouseup", () => {
        isResizing = false;
    });
}

// Apply Resizable Function to Both Windows
makeResizable(mainWindow);
makeResizable(nestedWindow);