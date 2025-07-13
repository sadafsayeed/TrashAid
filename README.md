🧠 **Inspiration**: Recycling can drastically reduce carbon emissions, save energy, and help our planet—but the current system places too much responsibility on users to manually sort their waste. That’s inconvenient, error-prone, and not always feasible. We wanted to eliminate that friction by building a smart trash can that handles sorting automatically and educates users on their impact, making recycling effortless and meaningful.

💡**What it does**: TrashAid is an intelligent trash can that automatically classifies and sorts waste into the correct bin: recyclable, compost, or landfill. Here's how it works:

The user places an item on the trash lid.

A camera captures an image and sends it to Gemini, our computer vision model.

Gemini identifies the type of waste and sends the result in a JSON payload to an Arduino.

The Arduino lights up an LED to indicate the category and rotates a chute system to align with the appropriate bin.

The trash lid opens, allowing the waste to be dropped in correctly.

A connected display shows the user:

How much CO₂ and water is saved

Which organization sponsored the smart can (great for awareness + ad revenue)

This makes waste sorting automatic, educational, and sustainable.

🛠️ **How we built it**: Built a mobile app to simulate the camera and screen interface of the trash can.

Used Gemini to classify waste items via image recognition.

Sent classification data to Arduino using serial communication and a lightweight JSON format.

Programmed the Arduino to:

Light the appropriate LED

Rotate the internal sorting chute mechanism

Open the trash lid

Connected a display to show feedback on environmental impact and sponsor branding.

⚙️ **Challenges we ran into**: Our Arduino lacked WiFi and had only 32KB of storage, which made remote communication and local processing difficult.

Had to rely on real-time serial communication with a local machine to send classification results.

Mechanically, coordinating the rotation of the chutes and opening the lid required precise synchronization to ensure waste was routed correctly.

🏆 **Accomplishments that we're proud of**: Successfully integrated computer vision with physical hardware to make a functional prototype.

Designed a complete system—software, electronics, mechanics, and UX—that works seamlessly.

Built a smart trash can that not only sorts waste but also educates users and helps generate sustainable ad revenue through sponsorships.

📚 **What we learned**: How to build around hardware limitations and optimize microcontroller communication.

Effective use of Gemini AI for image classification.

Designing real-time systems that bridge software and physical components.

Importance of user engagement through feedback and education.

🚀 **What's next for TrashAid**: We’re excited to take TrashAid to the next level. Here’s what’s next-

Replace simulation with a fully functional prototype (onboard camera, display, and smarter hardware).

Upgrade to a WiFi-enabled microcontroller with more storage and processing power.

Expand our training dataset for better classification accuracy.

Implement a user reward system for responsible disposal.

Partner with more sponsors to scale deployments in campuses, parks, malls, and public venues.
