"""
Management command: python manage.py seed_programs

Loads all 8 default AstirMind Institute programs into the database.
Safe to run multiple times — uses update_or_create keyed on slug.
"""

from django.core.management.base import BaseCommand
from programs.models import Program

PROGRAMS = [
    {
        "slug": "genai",
        "order": 1,
        "icon_name": "Brain",
        "title": "Generative AI & LLMs",
        "duration": "12 Weeks",
        "format": "Live + Project",
        "has_internship": True,
        "has_certificate": True,
        "tagline": "Build real AI applications using large language models — not just prompt demos.",
        "overview": (
            "This program takes you through the full lifecycle of building with LLMs: "
            "understanding how they work, connecting them to data, and shipping production-grade "
            "AI features. You will work on actual project codebases, not isolated notebooks."
        ),
        "modules": [
            {
                "title": "Foundations of Language Models",
                "topics": [
                    "Transformers architecture",
                    "Tokenization and embeddings",
                    "Pre-training vs fine-tuning",
                    "Model evaluation basics",
                ],
            },
            {
                "title": "Prompt Engineering & Chain Design",
                "topics": [
                    "Zero/few-shot prompting",
                    "Chain-of-thought techniques",
                    "LangChain / LlamaIndex pipelines",
                    "Structured output design",
                ],
            },
            {
                "title": "RAG & Retrieval Systems",
                "topics": [
                    "Vector databases (Chroma, Pinecone)",
                    "Semantic search",
                    "Chunking strategies",
                    "Hybrid retrieval",
                ],
            },
            {
                "title": "Fine-Tuning & Deployment",
                "topics": [
                    "LoRA and PEFT methods",
                    "Hugging Face ecosystem",
                    "FastAPI model serving",
                    "Monitoring in production",
                ],
            },
            {
                "title": "Capstone Project",
                "topics": [
                    "End-to-end AI product build",
                    "Mentor code reviews",
                    "Deployment on cloud",
                    "Portfolio write-up",
                ],
            },
        ],
        "tools": ["Python", "OpenAI API", "LangChain", "Pinecone", "FastAPI", "Hugging Face", "Docker"],
    },
    {
        "slug": "fullstack",
        "order": 2,
        "icon_name": "Globe",
        "title": "Full Stack Development",
        "duration": "16 Weeks",
        "format": "Live + Project",
        "has_internship": True,
        "has_certificate": True,
        "tagline": "Build and ship complete web products from database to deployment.",
        "overview": (
            "A comprehensive program covering modern frontend and backend engineering together. "
            "You will build full products across the stack, practice code review, and learn the "
            "workflows development teams actually use."
        ),
        "modules": [
            {
                "title": "Frontend Engineering",
                "topics": [
                    "React component architecture",
                    "State management (Context, Zustand)",
                    "REST and GraphQL consumption",
                    "Performance and accessibility",
                ],
            },
            {
                "title": "Backend & APIs",
                "topics": [
                    "Node.js with Express",
                    "RESTful API design",
                    "Authentication (JWT, OAuth2)",
                    "Error handling and logging",
                ],
            },
            {
                "title": "Databases",
                "topics": [
                    "PostgreSQL schema design",
                    "Query optimisation",
                    "MongoDB for document data",
                    "ORM patterns (Prisma)",
                ],
            },
            {
                "title": "DevOps Essentials",
                "topics": [
                    "Git workflows and CI/CD",
                    "Docker and containerisation",
                    "Cloud deployment (AWS/GCP basics)",
                    "Environment management",
                ],
            },
            {
                "title": "Capstone Project",
                "topics": [
                    "Full product from spec to production",
                    "Team collaboration simulation",
                    "Stakeholder review session",
                    "Portfolio documentation",
                ],
            },
        ],
        "tools": ["React", "Node.js", "PostgreSQL", "MongoDB", "Docker", "GitHub Actions", "AWS"],
    },
    {
        "slug": "datascience",
        "order": 3,
        "icon_name": "Database",
        "title": "Data Science & ML",
        "duration": "14 Weeks",
        "format": "Live + Project",
        "has_internship": False,
        "has_certificate": True,
        "tagline": "Go from raw data to deployed models — covering the full production ML cycle.",
        "overview": (
            "This program covers both the statistical foundations and the engineering discipline "
            "of ML. You will train, evaluate, and deploy models on real datasets, and learn to "
            "work with data pipelines the way teams do in industry."
        ),
        "modules": [
            {
                "title": "Python for AI & ML",
                "topics": [
                    "NumPy and Pandas fundamentals",
                    "Data cleaning and transformation",
                    "Visualisation with Matplotlib/Seaborn",
                    "Jupyter and scripted workflows",
                ],
            },
            {
                "title": "Statistical Learning",
                "topics": [
                    "Probability and inference",
                    "Supervised learning algorithms",
                    "Unsupervised clustering and dimensionality reduction",
                    "Model selection and evaluation",
                ],
            },
            {
                "title": "Deep Learning",
                "topics": [
                    "Neural network basics",
                    "CNNs and RNNs",
                    "Transfer learning",
                    "TensorFlow and PyTorch",
                ],
            },
            {
                "title": "Advanced Topics",
                "topics": [
                    "Recommendation systems",
                    "Ensemble techniques",
                    "NLP with transformers",
                    "GANs overview",
                ],
            },
            {
                "title": "ML in Production",
                "topics": [
                    "Feature stores",
                    "MLflow experiment tracking",
                    "Model serving with FastAPI",
                    "Monitoring and data drift",
                ],
            },
        ],
        "tools": ["Python", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "MLflow", "FastAPI"],
    },
    {
        "slug": "cv",
        "order": 4,
        "icon_name": "Eye",
        "title": "Computer Vision",
        "duration": "10 Weeks",
        "format": "Live + Project",
        "has_internship": False,
        "has_certificate": True,
        "tagline": "Image classification, object detection, and real-time video pipelines.",
        "overview": (
            "A focused program on visual AI. You will implement the major CV architectures, "
            "work with real camera feeds and sensor data, and build pipelines that run at "
            "production speed."
        ),
        "modules": [
            {
                "title": "Image Processing Fundamentals",
                "topics": [
                    "OpenCV operations",
                    "Colour spaces and histograms",
                    "Filtering and morphology",
                    "Feature extraction (SIFT, ORB)",
                ],
            },
            {
                "title": "Deep Learning for Vision",
                "topics": [
                    "CNNs in depth",
                    "ResNet, EfficientNet, ViT",
                    "Transfer learning for classification",
                    "Training on custom datasets",
                ],
            },
            {
                "title": "Object Detection & Segmentation",
                "topics": [
                    "YOLO family (v5, v8)",
                    "Faster R-CNN",
                    "Semantic and instance segmentation",
                    "Annotation with Label Studio",
                ],
            },
            {
                "title": "Deployment & Pipelines",
                "topics": [
                    "ONNX and model optimisation",
                    "Inference on edge devices",
                    "Video stream processing",
                    "REST API for vision models",
                ],
            },
        ],
        "tools": ["Python", "OpenCV", "PyTorch", "YOLO", "ONNX", "Label Studio", "FastAPI"],
    },
    {
        "slug": "android",
        "order": 5,
        "icon_name": "Smartphone",
        "title": "Android Development",
        "duration": "12 Weeks",
        "format": "Live + Project",
        "has_internship": True,
        "has_certificate": True,
        "tagline": "Native Android with Kotlin — from fundamentals to a published Play Store app.",
        "overview": (
            "You will write real Android applications in Kotlin using modern architecture patterns. "
            "The program ends with a polished app published to the Play Store that you own and can "
            "show in interviews."
        ),
        "modules": [
            {
                "title": "Core Java & Kotlin",
                "topics": [
                    "OOP fundamentals",
                    "Kotlin syntax and idioms",
                    "Coroutines and Flow",
                    "Collections and lambdas",
                ],
            },
            {
                "title": "Android Architecture",
                "topics": [
                    "Activities, Fragments, Intents",
                    "MVVM and ViewModel",
                    "Room database",
                    "Navigation component",
                ],
            },
            {
                "title": "UI Development",
                "topics": [
                    "Jetpack Compose basics",
                    "XML layouts and Material 3",
                    "RecyclerView and adapters",
                    "Animations and transitions",
                ],
            },
            {
                "title": "Integration & Publishing",
                "topics": [
                    "REST API consumption (Retrofit)",
                    "Firebase authentication",
                    "Google Maps integration",
                    "Play Store submission",
                ],
            },
        ],
        "tools": ["Kotlin", "Jetpack Compose", "Room", "Retrofit", "Firebase", "Android Studio"],
    },
    {
        "slug": "embedded",
        "order": 6,
        "icon_name": "Cpu",
        "title": "Embedded & IoT",
        "duration": "10 Weeks",
        "format": "Live + Project",
        "has_internship": False,
        "has_certificate": False,
        "tagline": "Microcontrollers, sensors, and connecting physical hardware to cloud backends.",
        "overview": (
            "A hands-on program covering the full embedded stack: writing firmware, reading sensors, "
            "managing communication protocols, and piping data to cloud dashboards. Physical hardware "
            "kits are used throughout."
        ),
        "modules": [
            {
                "title": "C Programming & Microcontrollers",
                "topics": [
                    "Basics of C for embedded",
                    "Memory management",
                    "Arduino and ESP32 platforms",
                    "GPIO, PWM, ADC",
                ],
            },
            {
                "title": "Sensors & Protocols",
                "topics": [
                    "I2C, SPI, UART communication",
                    "Temperature, IMU, distance sensors",
                    "Interrupt handling",
                    "Power management",
                ],
            },
            {
                "title": "Networking & IoT",
                "topics": [
                    "Wi-Fi and MQTT basics",
                    "Edge data processing",
                    "RTOS introduction",
                    "OTA firmware updates",
                ],
            },
            {
                "title": "Cloud Integration",
                "topics": [
                    "AWS IoT Core",
                    "Node-RED dashboards",
                    "Time-series data with InfluxDB",
                    "Alerts and automation",
                ],
            },
        ],
        "tools": ["C", "Arduino", "ESP32", "MQTT", "AWS IoT", "Node-RED", "InfluxDB"],
    },
    {
        "slug": "python",
        "order": 7,
        "icon_name": "TerminalSquare",
        "title": "Python Engineering",
        "duration": "8 Weeks",
        "format": "Self-paced + Mentor",
        "has_internship": False,
        "has_certificate": True,
        "tagline": "From syntax to production-quality Python. Backend, automation, and scripting.",
        "overview": (
            "This program is designed for people who want to write clean, maintainable Python — "
            "not just get scripts to run. Covers the language deeply and applies it to real backend "
            "and automation tasks."
        ),
        "modules": [
            {
                "title": "Language Fundamentals",
                "topics": [
                    "Data types and control flow",
                    "Functions, modules, packages",
                    "String, list, dict manipulation",
                    "File I/O and exception handling",
                ],
            },
            {
                "title": "OOP & Advanced Python",
                "topics": [
                    "Classes, inheritance, polymorphism",
                    "Decorators and generators",
                    "Regular expressions",
                    "Multithreading and async",
                ],
            },
            {
                "title": "Backend Development",
                "topics": [
                    "Flask and FastAPI",
                    "Database interaction (SQLAlchemy)",
                    "Authentication patterns",
                    "Testing with pytest",
                ],
            },
            {
                "title": "Automation & Scripting",
                "topics": [
                    "Web scraping (BeautifulSoup, Playwright)",
                    "Email and scheduling automation",
                    "CLI tool development",
                    "Packaging and distribution",
                ],
            },
        ],
        "tools": ["Python", "FastAPI", "Flask", "SQLAlchemy", "pytest", "Playwright"],
    },
    {
        "slug": "uiux",
        "order": 8,
        "icon_name": "PenTool",
        "title": "UI/UX Design",
        "duration": "10 Weeks",
        "format": "Live + Project",
        "has_internship": False,
        "has_certificate": True,
        "tagline": "User research, wireframing, and high-fidelity interfaces. Build a portfolio that gets hired.",
        "overview": (
            "A practical design program bridging research and execution. You will run user interviews, "
            "build wireframes, and ship high-fidelity designs with proper documentation — the full "
            "workflow used in product teams."
        ),
        "modules": [
            {
                "title": "Design Foundations",
                "topics": [
                    "Typography, colour, layout grids",
                    "Visual hierarchy and gestalt",
                    "Design system principles",
                    "Accessibility basics (WCAG)",
                ],
            },
            {
                "title": "User Research",
                "topics": [
                    "User interviews and surveys",
                    "Affinity mapping",
                    "Journey mapping",
                    "Competitor analysis",
                ],
            },
            {
                "title": "Wireframing & Prototyping",
                "topics": [
                    "Low-fidelity sketching",
                    "Figma components and auto-layout",
                    "Interactive prototypes",
                    "Usability testing",
                ],
            },
            {
                "title": "Handoff & Portfolio",
                "topics": [
                    "Design tokens and documentation",
                    "Dev handoff with Figma",
                    "Responsive design for web and mobile",
                    "Portfolio case study writing",
                ],
            },
        ],
        "tools": ["Figma", "FigJam", "Maze", "Notion", "Adobe Illustrator"],
    },
]


class Command(BaseCommand):
    help = "Seed the database with the 8 default AstirMind Institute programs"

    def handle(self, *args, **kwargs):
        created_count = 0
        updated_count = 0

        for data in PROGRAMS:
            slug = data.pop("slug")
            obj, created = Program.objects.update_or_create(
                slug=slug,
                defaults=data,
            )
            data["slug"] = slug  # restore for idempotency
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"  Created: {obj}"))
            else:
                updated_count += 1
                self.stdout.write(f"  Updated: {obj}")

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. {created_count} created, {updated_count} updated."
            )
        )
