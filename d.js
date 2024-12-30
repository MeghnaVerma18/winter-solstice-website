document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    // Function to animate background position
    const animateBackground = (section, direction) => {
        let position = direction === "right" ? 0 : 680; // Start position based on direction
        const step = 10; // Step size for movement
        const speed = 10; // Speed of animation in milliseconds
        const endPosition = direction === "right" ? 680 : 0;

        const interval = setInterval(() => {
            if ((direction === "right" && position >= endPosition) ||
                (direction === "left" && position <= endPosition)) {
                clearInterval(interval);
            } else {
                position += direction === "right" ? step : -step;
                section.style.backgroundPositionX = `${position}px`;
            }
        }, speed);
    };

    // Function to create snowfall effect
    const createSnowfall = () => {
        const snowflakeContainer = document.createElement("div");
        snowflakeContainer.classList.add("snow-container");
        document.body.appendChild(snowflakeContainer);

        const createSnowflake = () => {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.style.left = Math.random() * window.innerWidth + "px";
            snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = Math.random() * 10 + 10 + "px";

            snowflake.innerHTML = "&#10052;"; // Unicode for snowflake
            snowflakeContainer.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, 5000);
        };

        setInterval(createSnowflake, 100);
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    // Determine direction for animation
                    let direction = "right"; // Default direction
                    if (sectionId === "science" || sectionId === "celebrations") {
                        direction = "left";
                    }
                    
                    if (sectionId === "conclusion") {
                        direction = "right"; // Override for last section
                    }

                    // Animate background movement and add snowfall
                    animateBackground(entry.target, direction);
                    createSnowfall();
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe each section
    sections.forEach((section) => {
        observer.observe(section);
    });
});
