const gifElement = document.getElementById('gif');
const musicElement = document.getElementById('background-music');
const muteUnmuteButton = document.getElementById('mute-unmute');
let isMuted = false;

// GIF Array
const gifs = [
    'assets/gif1.gif',
    'assets/gif2.gif',
    'assets/gif3.gif',
    'assets/gif4.gif',
    'assets/gif5.gif',
    'assets/gif6.gif',
    'assets/gif7.gif',
    'assets/gif8.gif'
];
let currentGifIndex = 0;

// Function to switch GIF
function switchGif() {
    currentGifIndex = (currentGifIndex + 1) % gifs.length;
    gifElement.src = gifs[currentGifIndex];
    gifElement.style.transform = 'scale(0.9)'; // Shrink effect
    setTimeout(() => {
        gifElement.style.transform = 'scale(1)'; // Reset scale
    }, 300);
}

// Change GIF on click
gifElement.addEventListener('click', switchGif);

// Easter Egg: Activate Terminal with Long Press (1.5 seconds)
let longPressTimer;
gifElement.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => {
        activateTerminal();
    }, 1500);
});
gifElement.addEventListener('mouseup', () => clearTimeout(longPressTimer));
gifElement.addEventListener('mouseleave', () => clearTimeout(longPressTimer));

// Easter Egg: Terminal Mode
function activateTerminal() {
    document.body.innerHTML = `
        <div class="terminal">
            <div class="terminal-header">dewael.me Terminal</div>
            <pre id="terminal-content">
Type 'help' for a list of commands.
Type 'login' to access admin features.

> <span id="current-input"></span>_
            </pre>
        </div>`;
    setupTerminal();
}

function setupTerminal() {
    const terminal = document.getElementById('terminal-content');
    let inputDisplay = document.getElementById('current-input'); // Element to show current input
    let currentInput = '';
    let passwordMode = false; // For password input

    // Website launch date (set your actual launch date here)
    const launchDate = new Date('2024-09-28T18:05:00'); // Example launch date

    const commands = {
        help: "Available commands: 'login', 'about', 'email', 'time', 'date', 'exit', 'btc'.",
        about: "This is a fun retro-style terminal. Enjoy!",
        email: "Contact: stef@dewael.me",
        date: `Current date and time: ${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`, // Updated date command
        exit: "Exiting terminal mode..."
    };

    // Function to handle regular command input
    const handleCommand = (input) => {
        if (input === 'login') {
            passwordMode = true;
            terminal.innerHTML += `\n\nProvide password...`;
        } else if (input === 'exit') {
            terminal.innerHTML += `\n\n${commands[input]}`;
            setTimeout(() => {
                location.reload(); // Reloads the page when 'exit' is typed
            }, 1500); // Small delay to let the user see the exit message
        } else if (input === 'btc') {
            terminal.innerHTML += `\n\nTo the moon...`;
            terminal.innerHTML += `
                <div class="btc-img-wrapper">
                    <img src="assets/btc.jpg" alt="Bitcoin" class="btc-img">
                </div>`;
        } else if (input === 'time') {
            terminal.innerHTML += `\n\nWebsite has been live for: ${getLiveTime(launchDate)}`;
        } else if (commands[input]) {
            terminal.innerHTML += `\n\n${commands[input]}`;
        } else {
            terminal.innerHTML += `\n\nUnknown command: '${input}'`;
        }
    };

    // Function to calculate the time since the website went live
    const getLiveTime = (startDate) => {
        const now = new Date();
        const diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const weeks = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${years} years, ${months} months, ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
    };

    // Function to handle password input
    const handlePasswordInput = (input) => {
        if (input === 'bibigena69') {
            showAdminPage();
        } else {
            terminal.innerHTML += `\n\nIncorrect password. Login again.`;
        }
    };

    // Function to append the input line again after each command
    const resetRealTimeDisplay = () => {
        const inputLine = document.createElement('div');
        inputLine.innerHTML = `<span id="current-input"></span>`;
        terminal.appendChild(inputLine); // Append input line at the end of the terminal
        inputDisplay = document.getElementById('current-input');
        inputDisplay.textContent = ''; // Reset input display
    };

    // Listen for keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            terminal.innerHTML += `\n\n> ${passwordMode ? '*'.repeat(currentInput.length) : currentInput}`;
            if (passwordMode) {
                handlePasswordInput(currentInput);
                passwordMode = false;
            } else {
                handleCommand(currentInput);
            }
            currentInput = ''; // Reset input
            resetRealTimeDisplay(); // Re-append the input display after each command
        } else if (e.key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            inputDisplay.textContent = passwordMode ? '*'.repeat(currentInput.length) : currentInput;
        } else if (e.key.length === 1) {
            currentInput += e.key;
            inputDisplay.textContent = passwordMode ? '*'.repeat(currentInput.length) : currentInput; // Update input display as user types
        }
    });
}



function showAdminPage() {
    const loginTime = new Date();
    const birthDate = new Date(1998, 3, 9, 16); // April 9, 1998, 16:00 (months are 0-indexed)
    
    // Calculate time alive
    function calculateTimeAlive() {
        const now = new Date();
        const diff = now - birthDate;
        
        const yearsAlive = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const monthsAlive = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const weeksAlive = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
        const daysAlive = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hoursAlive = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesAlive = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsAlive = Math.floor((diff % (1000 * 60)) / 1000);
        
        return {
            years: yearsAlive,
            months: monthsAlive,
            weeks: weeksAlive,
            days: daysAlive,
            hours: hoursAlive,
            minutes: minutesAlive,
            seconds: secondsAlive
        };
    }
    
    // Function to update the "time alive" section
    function updateTimeAlive() {
        const timeAlive = calculateTimeAlive();
        document.getElementById('years-alive').textContent = timeAlive.years;
        document.getElementById('months-alive').textContent = timeAlive.months;
        document.getElementById('weeks-alive').textContent = timeAlive.weeks;
        document.getElementById('days-alive').textContent = timeAlive.days;
        document.getElementById('hours-alive').textContent = timeAlive.hours;
        document.getElementById('minutes-alive').textContent = timeAlive.minutes;
        document.getElementById('seconds-alive').textContent = timeAlive.seconds;
    }

    // Display the admin page
    document.body.innerHTML = `
        <div class="admin-page">
            <h1>Admin Page</h1>
            <p>Login Time: ${loginTime.toLocaleTimeString()}</p>
            <p>Date: ${loginTime.toLocaleDateString()}</p>
            <h2>Time Alive</h2>
            <ul>
                <li><strong>Years:</strong> <span id="years-alive"></span></li>
                <li><strong>Months:</strong> <span id="months-alive"></span></li>
                <li><strong>Weeks:</strong> <span id="weeks-alive"></span></li>
                <li><strong>Days:</strong> <span id="days-alive"></span></li>
                <li><strong>Hours:</strong> <span id="hours-alive"></span></li>
                <li><strong>Minutes:</strong> <span id="minutes-alive"></span></li>
                <li><strong>Seconds:</strong> <span id="seconds-alive"></span></li>
            </ul>
            <button class="sleek-button" onclick="exitTerminal()">Exit</button>
        </div>
    `;

    // Initial update of the time alive
    updateTimeAlive();

    // Set interval to update seconds and minutes every second
    setInterval(updateTimeAlive, 1000);
}


function exitTerminal() {
    location.reload(); // Reload page to exit
}






