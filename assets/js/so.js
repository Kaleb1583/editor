try {
    console.log("loaded so");

    var config = {
        numberOfSnowflakes: 50,
        interval: 10000000000, // Interval between new snowflakes
        sizeMin: 2, // Minimum size of snowflakes
        sizeMax: 6, // Maximum size of snowflakes
        durationMin: 5, // Minimum animation duration in seconds
        durationMax: 8, // Maximum animation duration in seconds
        delayMax: 5, // Maximum animation delay in seconds
    };

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        document.body.appendChild(snowflake);

        const size = Math.random() * (config.sizeMax - config.sizeMin) + config.sizeMin; 
        const startLeft = Math.random() * 100;
        const animationDuration =
            Math.random() * (config.durationMax - config.durationMin) + config.durationMin; 
        const delay = Math.random() * config.delayMax; 

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startLeft}vw`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationDelay = `${delay}s`;

        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }

    function createSnow() {
        for (let i = 0; i < config.numberOfSnowflakes; i++) {
            if (doSnowFlakes) {
                createSnowflake();
            }
        }
    }

    const today = new Date();
    const month = today.getMonth() + 1;

    if (month === 12) {
        var interval = setInterval(() => {
            if (doSnowFlakes) {
                createSnowflake();
            }
        }, config.interval);
        createSnow();
    }

} catch (err) {
    console.log("Couldn't load Christmas s.o!", err);
}
