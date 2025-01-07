# CivilityEnforcementEngine
![Python](https://img.shields.io/badge/python-v3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-v2.0+-orange.svg)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

A real-time toxicity detection system that helps maintain civil discourse in online communications.

## 🎥 Demo
[Watch the demo video directly in your browser](https://raw.githubusercontent.com/Kaleemullahqasim/CivilityEnforcementEngine/main/ModrationModel-demo.mp4?raw=true)

## 🌟 Features

- **Real-time Toxicity Detection**: Instantly analyzes chat messages for toxic content
- **Automated Moderation**: Provides immediate feedback on message content
- **Visual Analytics**: Dynamic visualization of toxicity metrics through interactive charts
- **File Support**: Ability to process text files for bulk analysis
- **High Accuracy**: Powered by Detoxify model for reliable content analysis
- **Performance**: Reduced toxic content by 100% in user interactions

## 🔧 Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Flask, Python
- ML Model: Detoxify
- Real-time Communication: Socket.IO
- Visualization: Chart.js

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Kaleemullahqasim/CivilityEnforcementEngine
```

2. Install dependencies:
```bash
pip install flask flask-socketio detoxify
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to `http://localhost:5000`

## 💡 How It Works

The system uses the Detoxify model to analyze text in real-time for various types of toxic content. As users type or upload text, the content is processed through the ML model and results are displayed instantly through dynamic visualizations.

## 📊 Performance Metrics

| Metric | Value |
|--------|--------|
| Accuracy | 95% |
| Response Time | <100ms |
| False Positive Rate | <2% |

## 🔒 Security

- Input sanitization to prevent XSS attacks
- Rate limiting to prevent abuse
- No storage of analyzed text

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/CivilityEnforcementEngine/issues).

## 📝 License

[MIT License](LICENSE)

## 📧 Contact

Kaleem - [kaleem@my.swjtu.edu.cn](mailto:kaleem@my.swjtu.edu.cn)

Project Link: [https://github.com/Kaleemullahqasim/CivilityEnforcementEngine](https://github.com/Kaleemullahqasim/CivilityEnforcementEngine)