const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
        difficulty: 1000,
        explanation: "The capital of France was set in 987, with Paris being the chosen city.",
        topic: "Geography"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars",
        difficulty: 1200,
        explanation: "Mars is called the Red Planet because of its reddish appearance, caused by iron oxide (rust) on its surface.",
        topic: "Geography"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        answer: "Harper Lee",
        difficulty: 1300,
        explanation: "Harper Lee wrote 'To Kill a Mockingbird,' a classic novel addressing racial injustice in the American South.",
        topic: "History"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
        difficulty: 1100,
        explanation: "The Pacific Ocean is the largest and deepest ocean, covering more than 60 million square miles.",
        topic: "Geography"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Iron", "Carbon"],
        answer: "Oxygen",
        difficulty: 1000,
        explanation: "Oxygen is a chemical element with the symbol 'O' and is essential for respiration and combustion.",
        topic: "Biology"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        answer: "Leonardo da Vinci",
        difficulty: 1400,
        explanation: "Leonardo da Vinci painted the Mona Lisa, one of the most famous portraits in the world, during the Renaissance.",
        topic: "History"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        answer: "Japan",
        difficulty: 1200,
        explanation: "Japan is called the Land of the Rising Sun because it lies to the east of the Asian mainland, where the sun appears to rise.",
        topic: "Geography"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra",
        difficulty: 1300,
        explanation: "Canberra was chosen as the capital of Australia in 1908 as a compromise between Sydney and Melbourne.",
        topic: "Geography"
    },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        answer: "Nitrogen",
        difficulty: 1100,
        explanation: "Nitrogen makes up about 78% of the Earth's atmosphere, making it the most abundant gas.",
        topic: "Biology"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        answer: "Albert Einstein",
        difficulty: 1500,
        explanation: "Albert Einstein developed the theory of relativity, which revolutionized our understanding of space, time, and gravity.",
        topic: "History"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        answer: "Diamond",
        difficulty: 1200,
        explanation: "Diamond is the hardest natural substance due to its strong covalent bonding between carbon atoms.",
        topic: "Biology"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Elephant", "Lion", "Tiger", "Gorilla"],
        answer: "Lion",
        difficulty: 1000,
        explanation: "The lion is often called the 'King of the Jungle' due to its dominance and role as a top predator in its habitat.",
        topic: "Biology"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: "Ottawa",
        difficulty: 1300,
        explanation: "Ottawa was chosen as the capital of Canada in 1857 due to its strategic location between English-speaking and French-speaking regions.",
        topic: "Geography"
    },
    {
        question: "Which continent is the Sahara Desert located on?",
        options: ["Asia", "Africa", "Australia", "South America"],
        answer: "Africa",
        difficulty: 1100,
        explanation: "The Sahara Desert, the largest hot desert in the world, is located on the African continent.",
        topic: "Geography"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale",
        difficulty: 1200,
        explanation: "The blue whale is the largest mammal, reaching lengths of up to 100 feet and weighing as much as 200 tons.",
        topic: "Biology"
    },
    {
        question: "Which country is famous for inventing pizza?",
        options: ["France", "Italy", "Spain", "Greece"],
        answer: "Italy",
        difficulty: 1000,
        explanation: "Pizza originated in Naples, Italy, in the 18th century as a dish for the working class.",
        topic: "History"
    },
    {
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        answer: "H2O",
        difficulty: 900,
        explanation: "The chemical formula for water is H2O, representing two hydrogen atoms bonded to one oxygen atom.",
        topic: "Biology"
    },
    {
        question: "Who is known as the father of computers?",
        options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
        answer: "Charles Babbage",
        difficulty: 1400,
        explanation: "Charles Babbage is considered the father of computers for designing the Analytical Engine, a precursor to modern computers.",
        topic: "Technology"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        answer: "Mercury",
        difficulty: 1100,
        explanation: "Mercury is the closest planet to the Sun, with an average distance of about 36 million miles.",
        topic: "Geography"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo",
        difficulty: 1200,
        explanation: "Tokyo has been the capital of Japan since 1868 and is one of the most populous cities in the world.",
        topic: "Geography"
    },
    {
        question: "Which language is the most widely spoken in the world?",
        options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
        answer: "Mandarin Chinese",
        difficulty: 1300,
        explanation: "Mandarin Chinese is the most widely spoken language, with over 1 billion native speakers.",
        topic: "History"
    },
    {
        question: "Which country is known for the Great Wall?",
        options: ["Japan", "China", "India", "Thailand"],
        answer: "China",
        difficulty: 1200,
        explanation: "The Great Wall of China was built over centuries to protect against invasions and is one of the most iconic structures in the world.",
        topic: "History"
    },
    {
        question: "Who wrote '1984'?",
        options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.D. Salinger"],
        answer: "George Orwell",
        difficulty: 1400,
        explanation: "George Orwell wrote '1984,' a dystopian novel exploring themes of totalitarianism and surveillance.",
        topic: "History"
    },
    {
        question: "What is the capital of Brazil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        answer: "Brasília",
        difficulty: 1300,
        explanation: "Brasília became the capital of Brazil in 1960, replacing Rio de Janeiro, to promote development in the interior.",
        topic: "Geography"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide",
        difficulty: 1100,
        explanation: "Plants absorb carbon dioxide during photosynthesis to produce glucose and oxygen.",
        topic: "Biology"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Neptune"],
        answer: "Jupiter",
        difficulty: 1200,
        explanation: "Jupiter is the largest planet, with a diameter of about 86,881 miles, more than 11 times that of Earth.",
        topic: "Geography"
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Joseph Lister"],
        answer: "Alexander Fleming",
        difficulty: 1400,
        explanation: "Alexander Fleming discovered penicillin in 1928, revolutionizing medicine by introducing the first antibiotic.",
        topic: "Biology"
    },
    {
        question: "What is the capital of South Africa?",
        options: ["Cape Town", "Pretoria", "Johannesburg", "Durban"],
        answer: "Pretoria",
        difficulty: 1300,
        explanation: "Pretoria is one of South Africa's three capital cities, serving as the executive capital.",
        topic: "Geography"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Oxygen"],
        answer: "Hydrogen",
        difficulty: 1000,
        explanation: "Hydrogen has the atomic number 1, making it the lightest and most abundant element in the universe.",
        topic: "Biology"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        answer: "Nile River",
        difficulty: 1300,
        explanation: "The Nile River is the longest river in the world, stretching about 4,135 miles through northeastern Africa.",
        topic: "Geography"
    },
    {
        question: "Who is the author of 'Pride and Prejudice'?",
        options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Virginia Woolf"],
        answer: "Jane Austen",
        difficulty: 1400,
        explanation: "Jane Austen wrote 'Pride and Prejudice,' a classic novel exploring themes of love, class, and societal expectations.",
        topic: "History"
    },
    {
        question: "Which country is known for the Taj Mahal?",
        options: ["Pakistan", "India", "Bangladesh", "Nepal"],
        answer: "India",
        difficulty: 1200,
        explanation: "The Taj Mahal, a UNESCO World Heritage Site, is located in Agra, India, and was built by Emperor Shah Jahan in memory of his wife.",
        topic: "History"
    },
    {
        question: "What is the smallest continent by land area?",
        options: ["Africa", "Europe", "Australia", "Antarctica"],
        answer: "Australia",
        difficulty: 1300,
        explanation: "Australia is the smallest continent, with a land area of about 2.97 million square miles.",
        topic: "Geography"
    },
    {
        question: "Who is known as the 'Father of Modern Physics'?",
        options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
        answer: "Albert Einstein",
        difficulty: 1500,
        explanation: "Albert Einstein is called the 'Father of Modern Physics' for his groundbreaking work on relativity and quantum theory.",
        topic: "History"
    },
    {
        question: "What is the capital of Argentina?",
        options: ["Buenos Aires", "Santiago", "Lima", "Montevideo"],
        answer: "Buenos Aires",
        difficulty: 1300,
        explanation: "Buenos Aires is the capital and largest city of Argentina, known for its European architecture and vibrant culture.",
        topic: "Geography"
    },
    {
        question: "Which planet has the most moons?",
        options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
        answer: "Saturn",
        difficulty: 1400,
        explanation: "Saturn has the most moons in the solar system, with over 80 confirmed moons.",
        topic: "Geography"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        answer: "Au",
        difficulty: 1000,
        explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum.'",
        topic: "Biology"
    },
    {
        question: "Who wrote 'The Great Gatsby'?",
        options: ["F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain", "John Steinbeck"],
        answer: "F. Scott Fitzgerald",
        difficulty: 1400,
        explanation: "F. Scott Fitzgerald wrote 'The Great Gatsby,' a novel exploring themes of wealth, love, and the American Dream.",
        topic: "History"
    },
    {
        question: "What is the capital of Egypt?",
        options: ["Cairo", "Alexandria", "Luxor", "Giza"],
        answer: "Cairo",
        difficulty: 1200,
        explanation: "Cairo is the capital of Egypt and one of the largest cities in Africa, known for its ancient history and landmarks.",
        topic: "Geography"
    },
    {
        question: "Which country is known for the Eiffel Tower?",
        options: ["France", "Italy", "Spain", "Germany"],
        answer: "France",
        difficulty: 1000,
        explanation: "The Eiffel Tower, one of the most iconic landmarks in the world, is located in Paris, France.",
        topic: "Geography"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        answer: "Antarctic Desert",
        difficulty: 1300,
        explanation: "The Antarctic Desert is the largest desert, covering about 5.5 million square miles of the Antarctic continent.",
        topic: "Geography"
    },
    {
        question: "Who is the Greek god of the sea?",
        options: ["Zeus", "Poseidon", "Hades", "Apollo"],
        answer: "Poseidon",
        difficulty: 1200,
        explanation: "Poseidon is the Greek god of the sea, earthquakes, and horses, often depicted with a trident.",
        topic: "History"
    },
    {
        question: "What is the capital of Germany?",
        options: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
        answer: "Berlin",
        difficulty: 1200,
        explanation: "Berlin is the capital and largest city of Germany, known for its rich history and cultural landmarks.",
        topic: "Geography"
    },
    {
        question: "Which country is known for the pyramids?",
        options: ["Greece", "Egypt", "Mexico", "Peru"],
        answer: "Egypt",
        difficulty: 1200,
        explanation: "Egypt is famous for its ancient pyramids, particularly the Great Pyramid of Giza, one of the Seven Wonders of the Ancient World.",
        topic: "History"
    },
    {
        question: "What is the capital of Italy?",
        options: ["Rome", "Milan", "Venice", "Florence"],
        answer: "Rome",
        difficulty: 1200,
        explanation: "Rome is the capital of Italy and was the center of the Roman Empire, known for its ancient ruins and historical significance.",
        topic: "Geography"
    },
    {
        question: "Which planet is known for its rings?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: "Saturn",
        difficulty: 1200,
        explanation: "Saturn is known for its prominent ring system, made up of ice, rock, and dust particles.",
        topic: "Geography"
    },
    {
        question: "Who wrote 'War and Peace'?",
        options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Nikolai Gogol"],
        answer: "Leo Tolstoy",
        difficulty: 1400,
        topic: "History"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
        answer: "Mitochondria",
        difficulty: 1000,
        explanation: "Mitochondria are known as the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
        topic: "Biology"
    },
    {
        question: "Which organ is responsible for filtering blood in the human body?",
        options: ["Liver", "Heart", "Kidney", "Lungs"],
        answer: "Kidney",
        difficulty: 1100,
        explanation: "The kidneys filter waste products from the blood and excrete them in the form of urine.",
        topic: "Biology"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", "Skin", "Heart"],
        answer: "Skin",
        difficulty: 1000,
        explanation: "The skin is the largest organ, serving as a protective barrier and playing a key role in temperature regulation.",
        topic: "Biology"
    },
    {
        question: "Who is credited with inventing the World Wide Web?",
        options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
        answer: "Tim Berners-Lee",
        difficulty: 1300,
        explanation: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN, to facilitate information sharing among scientists.",
        topic: "Technology"
    },
    {
        question: "What does 'HTTP' stand for in web addresses?",
        options: ["HyperText Transfer Protocol", "High-Level Text Protocol", "Hyperlink Text Transfer Process", "Home Tool Transfer Protocol"],
        answer: "HyperText Transfer Protocol",
        difficulty: 1200,
        explanation: "HTTP is the foundation of data communication for the World Wide Web, defining how messages are formatted and transmitted.",
        topic: "Technology"
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript",
        difficulty: 1100,
        explanation: "JavaScript is the primary language used for adding interactivity and dynamic content to websites.",
        topic: "Technology"
    },
    {
        question: "What year did the first iPhone launch?",
        options: ["2005", "2007", "2010", "2012"],
        answer: "2007",
        difficulty: 1200,
        explanation: "The first iPhone was announced by Steve Jobs on January 9, 2007, and released on June 29, 2007.",
        topic: "Technology"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln"],
        answer: "George Washington",
        difficulty: 1000,
        explanation: "George Washington served as the first President of the United States from 1789 to 1797.",
        topic: "History"
    },
    {
        question: "What event marked the start of World War I?",
        options: ["The bombing of Pearl Harbor", "The assassination of Archduke Franz Ferdinand", "The signing of the Treaty of Versailles", "The invasion of Poland"],
        answer: "The assassination of Archduke Franz Ferdinand",
        difficulty: 1300,
        explanation: "The assassination of Archduke Franz Ferdinand of Austria-Hungary on June 28, 1914, triggered a chain of events that led to World War I.",
        topic: "History"
    },
    {
        question: "Which ancient civilization built the pyramids of Giza?",
        options: ["The Romans", "The Greeks", "The Egyptians", "The Mayans"],
        answer: "The Egyptians",
        difficulty: 1200,
        explanation: "The pyramids of Giza were built by the ancient Egyptians during the Old Kingdom period, around 2580–2560 BCE.",
        topic: "History"
    },
    {
        question: "What is the process by which plants make their own food?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
        answer: "Photosynthesis",
        difficulty: 1100,
        explanation: "Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to produce glucose and oxygen.",
        topic: "Biology"
    },
    {
        question: "Which hormone regulates blood sugar levels in humans?",
        options: ["Insulin", "Adrenaline", "Estrogen", "Testosterone"],
        answer: "Insulin",
        difficulty: 1200,
        explanation: "Insulin, produced by the pancreas, helps regulate blood sugar levels by allowing cells to absorb glucose from the bloodstream.",
        topic: "Biology"
    },
    {
        question: "What is the name of the first artificial satellite launched into space?",
        options: ["Apollo 11", "Sputnik 1", "Voyager 1", "Hubble"],
        answer: "Sputnik 1",
        difficulty: 1300,
        explanation: "Sputnik 1, launched by the Soviet Union on October 4, 1957, was the first artificial satellite to orbit the Earth.",
        topic: "Technology"
    },
    {
        question: "Which ancient wonder was located in Babylon?",
        options: ["The Great Pyramid of Giza", "The Hanging Gardens of Babylon", "The Colossus of Rhodes", "The Lighthouse of Alexandria"],
        answer: "The Hanging Gardens of Babylon",
        difficulty: 1400,
        explanation: "The Hanging Gardens of Babylon are one of the Seven Wonders of the Ancient World, though their existence remains debated among historians.",
        topic: "History"
    },
    {
        question: "What is the main function of the CPU in a computer?",
        options: ["Storing data", "Displaying graphics", "Executing instructions", "Connecting to the internet"],
        answer: "Executing instructions",
        difficulty: 1200,
        explanation: "The CPU (Central Processing Unit) is the brain of the computer, responsible for executing instructions from programs.",
        topic: "Technology"
    },
    {
        question: "Which war was fought between the North and South regions of the United States?",
        options: ["World War I", "The Civil War", "The Revolutionary War", "The War of 1812"],
        answer: "The Civil War",
        difficulty: 1300,
        explanation: "The American Civil War (1861–1865) was fought between the Northern states (Union) and the Southern states (Confederacy) over issues including slavery and states' rights.",
        topic: "History"
    },
    {
        question: "What is the name of the first programmable computer?",
        options: ["ENIAC", "UNIVAC", "Z3", "IBM 701"],
        answer: "Z3",
        difficulty: 1400,
        explanation: "The Z3, created by Konrad Zuse in 1941, is considered the first programmable computer.",
        topic: "Technology"
    },
    {
        question: "Which blood type is known as the universal donor?",
        options: ["A", "B", "AB", "O"],
        answer: "O",
        difficulty: 1200,
        explanation: "Type O negative blood is considered the universal donor because it can be given to patients of any blood type.",
        topic: "Biology"
    },
    {
        question: "What is the name of the first human to travel into space?",
        options: ["Neil Armstrong", "Yuri Gagarin", "Alan Shepard", "John Glenn"],
        answer: "Yuri Gagarin",
        difficulty: 1300,
        explanation: "Yuri Gagarin, a Soviet cosmonaut, became the first human to travel into space on April 12, 1961.",
        topic: "History"
    },
    {
        question: "What is the primary function of white blood cells?",
        options: ["Carry oxygen", "Fight infections", "Clot blood", "Digest food"],
        answer: "Fight infections",
        difficulty: 1100,
        explanation: "White blood cells are part of the immune system and help the body fight infections and diseases.",
        topic: "Biology"
    },
    {
        question: "Which ancient empire was ruled by Julius Caesar?",
        options: ["The Greek Empire", "The Roman Empire", "The Persian Empire", "The Egyptian Empire"],
        answer: "The Roman Empire",
        difficulty: 1300,
        explanation: "Julius Caesar was a Roman general and statesman who played a critical role in the rise of the Roman Empire.",
        topic: "History"
    },
    {
        question: "What is the name of the first computer virus?",
        options: ["ILOVEYOU", "Creeper", "Mydoom", "Stuxnet"],
        answer: "Creeper",
        difficulty: 1400,
        explanation: "Creeper, created in the early 1970s, is considered the first computer virus. It was an experimental self-replicating program.",
        topic: "Technology"
    },
    {
        question: "Which part of the brain is responsible for memory and learning?",
        options: ["Cerebellum", "Hippocampus", "Amygdala", "Thalamus"],
        answer: "Hippocampus",
        difficulty: 1300,
        explanation: "The hippocampus is a region of the brain that plays a major role in memory formation and learning.",
        topic: "Biology"
    },
    {
        question: "What is the name of the first successful vaccine developed?",
        options: ["Polio vaccine", "Smallpox vaccine", "Measles vaccine", "Tuberculosis vaccine"],
        answer: "Smallpox vaccine",
        difficulty: 1200,
        explanation: "The smallpox vaccine, developed by Edward Jenner in 1796, was the first successful vaccine and led to the eradication of smallpox.",
        topic: "Biology"
    },
    {
        question: "Which ancient civilization invented the wheel?",
        options: ["The Egyptians", "The Mesopotamians", "The Greeks", "The Chinese"],
        answer: "The Mesopotamians",
        difficulty: 1300,
        explanation: "The wheel was invented by the ancient Mesopotamians around 3500 BCE, primarily for use in pottery before being adapted for transportation.",
        topic: "History"
    },
    {
        question: "What is the process by which plants make their own food?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
        answer: "Photosynthesis",
        difficulty: 800,
        explanation: "Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of glucose.",
        topic: "Biology"
    },
    {
        question: "Which molecule carries genetic information in humans?",
        options: ["RNA", "Protein", "DNA", "Lipid"],
        answer: "DNA",
        difficulty: 1200,
        explanation: "DNA (Deoxyribonucleic Acid) is the molecule that carries the genetic instructions used in the growth, development, functioning, and reproduction of all known living organisms.",
        topic: "Biology"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", "Skin", "Heart"],
        answer: "Skin",
        difficulty: 900,
        explanation: "The skin is the largest organ in the human body, serving as a protective barrier and playing a key role in temperature regulation and sensation.",
        topic: "Biology"
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        answer: "Nile River",
        difficulty: 1100,
        explanation: "The Nile River is the longest river in the world, stretching approximately 6,650 kilometers (4,130 miles) through northeastern Africa.",
        topic: "Geography"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra",
        difficulty: 700,
        explanation: "Canberra is the capital of Australia, chosen as a compromise between Sydney and Melbourne, the two largest cities in the country.",
        topic: "Geography"
    },
    {
        question: "Which desert is the largest in the world?",
        options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"],
        answer: "Antarctic Desert",
        difficulty: 1300,
        explanation: "The Antarctic Desert is the largest desert in the world, covering the entire continent of Antarctica with an area of about 14 million square kilometers.",
        topic: "Geography"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        answer: "George Washington",
        difficulty: 900,
        explanation: "George Washington was the first President of the United States, serving from 1789 to 1797 and setting many precedents for the office.",
        topic: "History"
    },
    {
        question: "In which year did World War I begin?",
        options: ["1914", "1918", "1939", "1941"],
        answer: "1914",
        difficulty: 1000,
        explanation: "World War I began in 1914 after the assassination of Archduke Franz Ferdinand of Austria-Hungary and lasted until 1918.",
        topic: "History"
    },
    {
        question: "Which ancient civilization built the pyramids of Giza?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        answer: "Egyptians",
        difficulty: 800,
        explanation: "The ancient Egyptians built the pyramids of Giza as tombs for their pharaohs, with the Great Pyramid being one of the Seven Wonders of the Ancient World.",
        topic: "History"
    },
];

export default questions;
