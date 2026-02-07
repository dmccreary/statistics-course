document.addEventListener("DOMContentLoaded", function () {

    // Find all quote admonitions with "Delta" in the title (Delta Moment, Delta's Sidequest, etc.)
    document.querySelectorAll(".admonition.quote").forEach((admonition) => {
        const title = admonition.querySelector(".admonition-title");
        if (title && title.textContent.toLowerCase().includes("delta")) {
            admonition.classList.add("delta-moment");
        }
    });

    // Find all admonitions with "Sylvia" or her signature phrases in the title
    const sylviaPhrases = [
        "sylvia",
        "acorn for your thoughts",
        "let's crack this nut",
        "squirrel away",
        "my tail's tingling"
    ];
    document.querySelectorAll(".admonition").forEach((admonition) => {
        const title = admonition.querySelector(".admonition-title");
        if (title) {
            const titleText = title.textContent.toLowerCase();
            if (sylviaPhrases.some(phrase => titleText.includes(phrase))) {
                admonition.classList.add("sylvia");
            }
        }
    });

    // Find all admonitions with the "prompt" class
    document.querySelectorAll(".admonition.prompt").forEach((admonition) => {
        // Create a "Copy" button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.className = "copy-button";

        // Append the button to the admonition
        admonition.appendChild(copyButton);

        // Add event listener for the button
        copyButton.addEventListener("click", () => {
            // Collect all text content inside the admonition except the title and button
            const promptText = Array.from(admonition.querySelectorAll("p:not(.admonition-title)"))
                .map((p) => p.textContent.trim())
                .join("\n");

            if (promptText) {
                // Copy the collected text to the clipboard
                navigator.clipboard.writeText(promptText).then(
                    () => {
                        // Show feedback on successful copy
                        copyButton.textContent = "Copied!";
                        setTimeout(() => (copyButton.textContent = "Copy"), 2000);
                    },
                    (err) => {
                        console.error("Failed to copy text: ", err);
                    }
                );
            } else {
                console.error("No prompt text found to copy.");
            }
        });
    });
});
