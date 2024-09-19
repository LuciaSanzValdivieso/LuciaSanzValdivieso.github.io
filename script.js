document.addEventListener('DOMContentLoaded', function() {
    let correctButton = document.getElementById('correct-btn');
    let errorButton = document.getElementById('error-btn');
    let errorReportSection = document.getElementById('error-report-section');
    let otherCommentsSection = document.getElementById('other-comments-section');
    let submitButtonSection = document.getElementById('submit-button-section');
    let submitButton = document.getElementById('submit-btn');
    let lastSegmentNotification = document.getElementById('last-segment-notification');

    let errorSelectionDiv = document.getElementById('error-selection');
    let errorTypeSelect = document.getElementById('error-type');
    let correctEquivalentInput = document.getElementById('correct-equivalent');
    let otherCommentsTextarea = document.getElementById('other-comments');

    let currentSegmentPairID = 1; // Placeholder for the current segment pair ID
    let segments = [
        {spanish: 'Hola, ¿cómo estás?', english: 'Hello, how are you?'},
        // Add more segments as needed
    ];

    let currentIndex = 0;

    function loadNextSegment() {
        if (currentIndex < segments.length) {
            document.getElementById('spanish-segment').innerText = segments[currentIndex].spanish;
            document.getElementById('english-segment').innerText = segments[currentIndex].english;
        } else {
            lastSegmentNotification.classList.remove('hidden');
        }
    }

    correctButton.addEventListener('click', function() {
        errorReportSection.classList.add('hidden');
        otherCommentsSection.classList.remove('hidden');
        submitButtonSection.classList.remove('hidden');
    });

    errorButton.addEventListener('click', function() {
        errorReportSection.classList.remove('hidden');
        otherCommentsSection.classList.remove('hidden');
        submitButtonSection.classList.remove('hidden');
    });

    submitButton.addEventListener('click', function() {
        let data = {
            segmentPairID: currentSegmentPairID,
            timestamp: new Date().toISOString(),
            action: errorReportSection.classList.contains('hidden') ? 'correct' : 'error',
            errorReports: [],
            otherComments: otherCommentsTextarea.value
        };

        if (!errorReportSection.classList.contains('hidden')) {
            data.errorReports.push({
                selectedText: errorSelectionDiv.innerText,
                errorType: errorTypeSelect.value,
                correctEquivalent: correctEquivalentInput.value
            });
        }

        console.log('Sending data:', data);  // Debugging line to check data being sent
        sendToGoogleSheets(data);
        currentIndex++;
        loadNextSegment();
    });

   function sendToServer(data) {
    fetch('http://localhost:3000', {  // URL of your local server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    }

// Call the function to send data
sendToServer(data);



    console.log('Sending data:', data);

    loadNextSegment();
});
