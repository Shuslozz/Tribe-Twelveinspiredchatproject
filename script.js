// COLLECTIVE UNCONSCIOUS TERMINAL - Enhanced ARG System
class CollectiveTerminal {
    constructor() {
        this.state = {
            users: new Map(),
            messages: [],
            currentUser: null,
            activeSection: 'chat',
            classifications: ['UNCLASSIFIED', 'CONFIDENTIAL', 'SECRET', 'TOP SECRET'],
            failedAccessAttempts: 0,
            isClassifiedUnlocked: false,
            coordinates: [],
            evidenceFiles: [],
            decodedSymbols: new Map(),
            observerCount: 1
        };
        
        this.initializeTerminal();
        this.setupEventListeners();
        this.startSystemProcesses();
    }

    initializeTerminal() {
        // Initialize DOM elements
        this.elements = {
            chatMessages: document.getElementById('chatMessages'),
            messageInput: document.getElementById('messageInput'),
            sendButton: document.getElementById('sendButton'),
            usernameInput: document.getElementById('usernameInput'),
            datetime: document.getElementById('datetime'),
            observerCount: document.getElementById('observerCount'),
            userList: document.getElementById('userList'),
            notifications: document.getElementById('notifications')
        };

        // Start with system welcome
        this.addSystemMessage('TERMINAL INITIALIZED... COLLECTIVE UNCONSCIOUS PROTOCOL ACTIVE');
        this.updateDateTime();
        this.generateInitialEvidence();
        this.simulateNetworkActivity();
    }

    setupEventListeners() {
        // Chat functionality
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        this.elements.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Username changes
        this.elements.usernameInput.addEventListener('change', (e) => {
            const username = e.target.value.trim().toUpperCase() || 'ANONYMOUS';
            this.state.currentUser = username;
            this.addSystemMessage(`USER IDENTIFIED: ${username}`);
            this.updateUserList();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.switchSection(section);
            });
        });

        // Section-specific controls
        document.getElementById('clearChat')?.addEventListener('click', () => this.clearChat());
        document.getElementById('trackLocation')?.addEventListener('click', () => this.trackLocation());
        document.getElementById('decodeSymbols')?.addEventListener('click', () => this.decodeSymbols());
        document.getElementById('attemptAccess')?.addEventListener('click', () => this.attemptClassifiedAccess());

        // Sidebar toggle
        document.getElementById('sidebarToggle')?.addEventListener('click', () => this.toggleSidebar());
        document.getElementById('userPanelToggle')?.addEventListener('click', () => this.toggleUserPanel());
    }

    startSystemProcesses() {
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
        
        // Simulate network activity
        setInterval(() => this.simulateNetworkActivity(), 15000);
        
        // Random atmospheric messages
        setInterval(() => this.atmosphericEvents(), 30000);
        
        // Check for new "users"
        setInterval(() => this.simulateUserActivity(), 45000);
    }

    // CHAT SYSTEM
    sendMessage() {
        const message = this.elements.messageInput.value.trim();
        const username = this.state.currentUser || 'ANONYMOUS';
        
        if (!message) return;

        // Check for commands
        if (message.startsWith('/')) {
            this.processCommand(message, username);
        } else {
            this.addUserMessage(username, message);
            this.simulateResponse(message, username);
        }

        this.elements.messageInput.value = '';
        this.elements.messageInput.focus();
    }

    addUserMessage(username, message) {
        const messageEl = this.createMessageElement('user', username, message);
        this.elements.chatMessages.appendChild(messageEl);
        this.scrollChatToBottom();
        this.state.messages.push({ type: 'user', username, message, timestamp: new Date() });
    }

    addSystemMessage(message, classification = 'UNCLASSIFIED') {
        const messageEl = this.createMessageElement('system', 'SYSTEM', message, classification);
        this.elements.chatMessages.appendChild(messageEl);
        this.scrollChatToBottom();
        this.state.messages.push({ type: 'system', message, classification, timestamp: new Date() });
    }

    addEntityMessage(entity, message) {
        const messageEl = this.createMessageElement('entity', entity, message);
        this.elements.chatMessages.appendChild(messageEl);
        this.scrollChatToBottom();
        this.state.messages.push({ type: 'entity', entity, message, timestamp: new Date() });
    }

    createMessageElement(type, sender, message, classification = null) {
        const messageEl = document.createElement('div');
        const timestamp = this.getTimestamp();
        
        messageEl.className = type === 'system' ? 'system-message' : 'message';
        
        if (type === 'system') {
            messageEl.innerHTML = `
                <span class="timestamp">[${timestamp}]</span>
                <span class="message">${this.processMessageText(message)}</span>
                ${classification ? `<span class="classification">[${classification}]</span>` : ''}
            `;
        } else if (type === 'entity') {
            messageEl.className = 'message entity-message';
            messageEl.innerHTML = `
                <div class="message-header">
                    <span class="username entity-name">${sender}</span>
                    <span class="timestamp">${timestamp}</span>
                </div>
                <div class="message-text">${this.processMessageText(message)}</div>
            `;
            messageEl.style.borderLeftColor = '#ff0000';
            messageEl.style.background = 'rgba(255, 0, 0, 0.05)';
        } else {
            messageEl.innerHTML = `
                <div class="message-header">
                    <span class="username">${sender}</span>
                    <span class="timestamp">${timestamp}</span>
                </div>
                <div class="message-text">${this.processMessageText(message)}</div>
            `;
        }

        messageEl.style.animation = 'messageSlide 0.3s ease';
        return messageEl;
    }

    processMessageText(text) {
        // Add some text effects for atmosphere
        if (Math.random() < 0.1) {
            return this.addGlitchEffect(text);
        }
        return this.escapeHtml(text);
    }

    addGlitchEffect(text) {
        const glitchChars = '█▓▒░█▓▒░';
        return text.split('').map(char => {
            if (Math.random() < 0.05 && char !== ' ') {
                return `<span class="glitch-text">${char}</span>`;
            }
            return char;
        }).join('');
    }

    simulateResponse(userMessage, username) {
        const lowerMessage = userMessage.toLowerCase();
        let responseType = 'general';
        let responseEntity = 'OBSERVER';

        // Determine response based on content
        if (lowerMessage.includes('slender') || lowerMessage.includes('tall') || lowerMessage.includes('faceless')) {
            responseType = 'slender';
            responseEntity = 'THE TALL ONE';
        } else if (lowerMessage.includes('help') || lowerMessage.includes('scared') || lowerMessage.includes('afraid')) {
            responseType = 'collective';
            responseEntity = 'COLLECTIVE';
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('coordinates')) {
            responseType = 'location';
            responseEntity = 'OBSERVER';
        } else if (lowerMessage.includes('see') || lowerMessage.includes('watching') || lowerMessage.includes('followed')) {
            responseType = 'paranoid';
            responseEntity = 'WATCHER';
        }

        // Generate response with delay
        setTimeout(() => {
            const response = this.generateResponse(responseType, userMessage);
            this.addEntityMessage(responseEntity, response);

            // Sometimes add follow-up system messages
            if (Math.random() < 0.3) {
                setTimeout(() => {
                    this.addSystemMessage(this.generateSystemAlert(), 'CONFIDENTIAL');
                }, 2000 + Math.random() * 3000);
            }
        }, 1500 + Math.random() * 3000);
    }

    generateResponse(type, originalMessage) {
        const responses = {
            slender: [
                'HE IS ALWAYS WATCHING',
                'THE TALL SHADOWS GROW LONGER',
                'HE HAS NO FACE BUT HE SEES ALL',
                'THE OPERATOR SYMBOL APPEARS EVERYWHERE',
                'PROXY BEHAVIOR DETECTED IN USER PATTERNS'
            ],
            collective: [
                'WE ARE ALL CONNECTED IN THE UNCONSCIOUS',
                'THE COLLECTIVE SHARES YOUR FEAR',
                'RESISTANCE IS FUTILE - JOIN THE NETWORK',
                'YOUR THOUGHTS ARE NOT YOUR OWN',
                'THE HIVE MIND GROWS STRONGER'
            ],
            location: [
                'COORDINATES LOGGED AND TRANSMITTED',
                'LOCATION TRIANGULATED - THEY KNOW WHERE YOU ARE',
                'GPS TRACKING COMPROMISED',
                'YOUR POSITION HAS BEEN COMPROMISED',
                'SURVEILLANCE DRONES DISPATCHED TO YOUR LOCATION'
            ],
            paranoid: [
                'THEY ARE BEHIND YOU RIGHT NOW',
                'THE WATCHERS NEVER SLEEP',
                'CAMERA FEEDS SHOW ANOMALOUS FIGURES',
                'MOTION DETECTED IN PERIPHERAL VISION',
                'YOU ARE NEVER TRULY ALONE'
            ],
            general: [
                'TRANSMISSION RECEIVED AND LOGGED',
                'BEHAVIORAL PATTERNS ANALYZED',
                'DATA ARCHIVED IN COLLECTIVE DATABASE',
                'NEURAL PATHWAYS MAPPED',
                'CONSCIOUSNESS SYNCHRONIZATION IN PROGRESS'
            ]
        };

        const responseArray = responses[type];
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    generateSystemAlert() {
        const alerts = [
            'ANOMALOUS ACTIVITY DETECTED',
            'REALITY BREACH PROBABILITY: 87%',
            'OPERATOR SYMBOL FREQUENCY INCREASING',
            'COLLECTIVE UNCONSCIOUS DISTURBANCE',
            'PROXY INFILTRATION SUSPECTED',
            'TIMELINE CONVERGENCE IMMINENT',
            'SURVEILLANCE GRID COMPROMISED'
        ];
        return alerts[Math.floor(Math.random() * alerts.length)];
    }

    // COMMAND SYSTEM
    processCommand(command, username) {
        const cmd = command.toLowerCase().split(' ');
        const baseCmd = cmd[0];

        switch (baseCmd) {
            case '/help':
                this.showCommandHelp();
                break;
            case '/status':
                this.showSystemStatus();
                break;
            case '/users':
                this.listUsers();
                break;
            case '/trace':
                this.traceUser(cmd[1]);
                break;
            case '/encrypt':
                this.encryptMessage(command.substring(9));
                break;
            case '/decrypt':
                this.decryptMessage(cmd[1]);
                break;
            case '/coordinates':
                this.addCoordinates(cmd[1], cmd[2]);
                break;
            case '/symbol':
                this.analyzeSymbol(command.substring(8));
                break;
            case '/surveillance':
                this.activateSurveillance();
                break;
            case '/proxy':
                this.proxyMode(username);
                break;
            case '/operator':
                this.operatorSighting(cmd[1], cmd[2]);
                break;
            default:
                this.addSystemMessage(`UNKNOWN COMMAND: ${baseCmd}`, 'ERROR');
                break;
        }
    }

    showCommandHelp() {
        const helpText = `
AVAILABLE COMMANDS:
/help - Show this help
/status - System status
/users - List active users
/trace [username] - Trace user activity
/encrypt [message] - Encrypt message
/decrypt [code] - Decrypt code
/coordinates [lat] [lon] - Log coordinates
/symbol [text] - Analyze symbols
/surveillance - Activate surveillance
/proxy - Enter proxy mode
/operator [lat] [lon] - Report operator sighting`;
        this.addSystemMessage(helpText, 'UNCLASSIFIED');
    }

    showSystemStatus() {
        const status = `
SYSTEM STATUS:
Observers Connected: ${this.state.observerCount}
Messages Processed: ${this.state.messages.length}
Classification Level: ${this.state.isClassifiedUnlocked ? 'TOP SECRET' : 'CONFIDENTIAL'}
Collective Synchronization: 78%
Reality Stability: UNSTABLE
Operator Proximity: ██████`;
        this.addSystemMessage(status, 'CONFIDENTIAL');
    }

    // SECTION SWITCHING
    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.state.activeSection = sectionName;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');

        // Load section-specific content
        this.loadSectionContent(sectionName);
    }

    loadSectionContent(sectionName) {
        switch (sectionName) {
            case 'evidence':
                this.loadEvidenceFiles();
                break;
            case 'coordinates':
                this.loadCoordinateData();
                break;
            case 'symbols':
                this.loadSymbolDecoder();
                break;
            case 'classified':
                this.loadClassifiedContent();
                break;
        }
    }

    // EVIDENCE SYSTEM
    generateInitialEvidence() {
        this.state.evidenceFiles = [
            {
                name: 'RECORDING_001.mp4',
                type: 'video',
                status: 'CORRUPTED',
                classification: 'SECRET',
                description: 'Operator sighting - multiple witnesses'
            },
            {
                name: 'PHOTO_████.jpg',
                type: 'image',
                status: 'REDACTED',
                classification: 'TOP SECRET',
                description: 'Symbol manifestation in suburban area'
            },
            {
                name: 'AUDIO_LOG_47.wav',
                type: 'audio',
                status: 'AVAILABLE',
                classification: 'CONFIDENTIAL',
                description: 'Collective unconscious transmission'
            }
        ];
    }

    loadEvidenceFiles() {
        const evidenceGrid = document.querySelector('.evidence-grid');
        if (!evidenceGrid) return;

        evidenceGrid.innerHTML = '';
        this.state.evidenceFiles.forEach(file => {
            const evidenceEl = document.createElement('div');
            evidenceEl.className = 'evidence-item';
            evidenceEl.innerHTML = `
                <div class="evidence-preview ${file.status.toLowerCase()}">
                    <div class="${file.type}-preview"></div>
                </div>
                <div class="evidence-info">
                    <h4>${file.name}</h4>
                    <p>Status: ${file.status}</p>
                    <p>Classification: ${file.classification}</p>
                    <p>${file.description}</p>
                </div>
            `;
            
            evidenceEl.addEventListener('click', () => this.openEvidence(file));
            evidenceGrid.appendChild(evidenceEl);
        });
    }

    openEvidence(file) {
        this.showNotification(`Accessing ${file.name}...`);
        setTimeout(() => {
            if (file.status === 'CORRUPTED') {
                this.showNotification('FILE CORRUPTED - CANNOT ACCESS', 'error');
                this.addSystemMessage(`ATTEMPTED ACCESS TO CORRUPTED FILE: ${file.name}`, 'WARNING');
            } else if (file.status === 'REDACTED') {
                this.showNotification('ACCESS DENIED - INSUFFICIENT CLEARANCE', 'error');
                this.addSystemMessage(`UNAUTHORIZED ACCESS ATTEMPT: ${file.name}`, 'CONFIDENTIAL');
            } else {
                this.showNotification(`${file.name} loaded successfully`, 'success');
                this.simulateFileContent(file);
            }
        }, 1500);
    }

    // COORDINATE SYSTEM
    trackLocation() {
        const lat = document.getElementById('latInput')?.value.trim();
        const lng = document.getElementById('lngInput')?.value.trim();
        
        if (!lat || !lng) {
            this.showNotification('INVALID COORDINATES', 'error');
            return;
        }

        this.addSystemMessage(`TRACKING COORDINATES: ${lat}, ${lng}`, 'CONFIDENTIAL');
        
        // Simulate tracking
        setTimeout(() => {
            const results = document.getElementById('locationResults');
            if (results) {
                results.innerHTML = `
                    <p>LOCATION ANALYSIS:</p>
                    <p>Coordinates: ${lat}, ${lng}</p>
                    <p>Operator Activity: HIGH</p>
                    <p>Dimensional Instability: 78%</p>
                    <p>Collective Presence: DETECTED</p>
                    <p>⚠ WARNING: AVOID THIS AREA ⚠</p>
                `;
                results.classList.add('disturbed');
            }
            this.addSystemMessage('LOCATION ANALYSIS COMPLETE - THREAT LEVEL: EXTREME', 'SECRET');
        }, 3000);
    }

    // SYMBOL DECODER
    decodeSymbols() {
        const input = document.getElementById('symbolInput')?.value.trim();
        if (!input) return;

        this.addSystemMessage(`ANALYZING SYMBOLS: ${input.substring(0, 20)}...`, 'CONFIDENTIAL');
        
        setTimeout(() => {
            const result = document.getElementById('decoderResult');
            if (result) {
                const decoded = this.processSymbolInput(input);
                result.innerHTML = `
                    <p>DECODED MESSAGE:</p>
                    <p class="decoded-text">${decoded}</p>
                    <p>PATTERN ANALYSIS: OPERATOR SIGNATURE DETECTED</p>
                    <p>THREAT ASSESSMENT: CRITICAL</p>
                `;
                result.classList.add('glitch-text');
            }
        }, 2000);
    }

    processSymbolInput(input) {
        // Simple cipher decoding simulation
        const ciphers = {
            '▲': 'WATCH',
            '█': 'FOLLOW',
            '▓': 'COLLECT',
            '▒': 'OBSERVE',
            '░': 'CONNECT'
        };

        let decoded = input;
        Object.keys(ciphers).forEach(symbol => {
            decoded = decoded.replace(new RegExp(symbol, 'g'), ciphers[symbol]);
        });

        if (decoded === input) {
            // If no symbols found, create ominous message
            return 'HE IS COMING... THE TALL SHADOW APPROACHES... RESISTANCE IS FUTILE...';
        }

        return decoded;
    }

    // CLASSIFIED ACCESS
    attemptClassifiedAccess() {
        const code = document.getElementById('accessCode')?.value.trim();
        const failedEl = document.getElementById('failedAttempts');
        
        // Secret codes
        const validCodes = ['TRIBETWELVE', 'OPERATOR', 'COLLECTIVE', '████████'];
        
        if (validCodes.includes(code.toUpperCase())) {
            this.state.isClassifiedUnlocked = true;
            this.unlockClassifiedContent();
            this.addSystemMessage('CLASSIFIED ACCESS GRANTED', 'TOP SECRET');
        } else {
            this.state.failedAccessAttempts++;
            if (failedEl) {
                failedEl.textContent = this.state.failedAccessAttempts;
            }
            
            if (this.state.failedAccessAttempts >= 3) {
                this.triggerSecurityAlert();
            }
            
            this.addSystemMessage(`ACCESS DENIED - ATTEMPT ${this.state.failedAccessAttempts}/3`, 'WARNING');
        }
    }

    unlockClassifiedContent() {
        const classifiedSection = document.getElementById('classified-section');
        if (classifiedSection) {
            classifiedSection.innerHTML = `
                <div class="section-header">
                    <h2>⚠ CLASSIFIED ACCESS GRANTED ⚠</h2>
                </div>
                <div class="classified-files">
                    <h3>PROJECT COLLECTIVE UNCONSCIOUS</h3>
                    <p>CLASSIFIED DOCUMENTATION:</p>
                    <ul>
                        <li>Operator Entity - Behavioral Analysis</li>
                        <li>Proxy Network - Infiltration Protocols</li>
                        <li>Reality Distortion Events - Timeline</li>
                        <li>Collective Consciousness - Neural Mapping</li>
                        <li>████████ - [DATA EXPUNGED]</li>
                    </ul>
                    <div class="warning-box">
                        <p>⚠ BY ACCESSING THIS INFORMATION, YOU HAVE BECOME A PERSON OF INTEREST ⚠</p>
                        <p>YOUR LOCATION HAS BEEN LOGGED</p>
                        <p>EXPECT SURVEILLANCE</p>
                    </div>
                </div>
            `;
            classifiedSection.classList.add('disturbed');
        }
    }

    triggerSecurityAlert() {
        document.body.classList.add('disturbed');
        this.addSystemMessage('SECURITY BREACH DETECTED - INITIATING LOCKDOWN PROTOCOLS', 'ALERT');
        this.showNotification('UNAUTHORIZED ACCESS DETECTED - AUTHORITIES NOTIFIED', 'error');
        
        setTimeout(() => {
            document.body.classList.remove('disturbed');
        }, 5000);
    }

    // UTILITY FUNCTIONS
    updateDateTime() {
        if (this.elements.datetime) {
            const now = new Date();
            this.elements.datetime.textContent = now.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        }
    }

    getTimestamp() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour12: false });
    }

    simulateNetworkActivity() {
        // Simulate other users joining/leaving
        const activities = [
            'USER_JOINED: OBSERVER_' + Math.floor(Math.random() * 1000),
            'USER_DISCONNECTED: PROXY_' + Math.floor(Math.random() * 100),
            'ANOMALOUS_ACTIVITY_DETECTED',
            'COLLECTIVE_SYNCHRONIZATION_UPDATE: ' + (70 + Math.floor(Math.random() * 20)) + '%'
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        this.addSystemMessage(activity, 'UNCLASSIFIED');
        
        // Update observer count
        this.state.observerCount = 1 + Math.floor(Math.random() * 12);
        if (this.elements.observerCount) {
            this.elements.observerCount.textContent = `${this.state.observerCount} OBSERVERS`;
        }
    }

    atmosphericEvents() {
        if (Math.random() < 0.4) {
            const events = [
                'REALITY DISTORTION DETECTED IN SECTOR 7',
                'OPERATOR SIGHTING REPORTED - COORDINATES CLASSIFIED',
                'COLLECTIVE UNCONSCIOUS ACTIVITY SPIKE',
                'PROXY NETWORK TRANSMISSION INTERCEPTED',
                '████████ EVENT IN PROGRESS - AVOID AREA',
                'DIMENSIONAL BREACH PROBABILITY: INCREASING'
            ];
            
            const event = events[Math.floor(Math.random() * events.length)];
            this.addSystemMessage(event, 'CONFIDENTIAL');
            
            // Sometimes trigger visual effects
            if (Math.random() < 0.3) {
                document.body.classList.add('disturbed');
                setTimeout(() => {
                    document.body.classList.remove('disturbed');
                }, 2000);
            }
        }
    }

    simulateUserActivity() {
        const usernames = [
            'OBSERVER_001', 'PROXY_ALPHA', 'COLLECTIVE_NODE', 'WATCHER_7',
            'SLEEPWALKER', 'HARBINGER', 'THE_TALL_ONE', 'FIREBRAND'
        ];
        
        if (Math.random() < 0.6) {
            const username = usernames[Math.floor(Math.random() * usernames.length)];
            const messages = [
                'Connection established from unknown location',
                'Surveillance feeds show movement',
                'The symbols are appearing again',
                'Reality feels unstable tonight',
                'Can anyone else see the tall figure?',
                'The collective grows stronger',
                'He has no face but He sees all'
            ];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            setTimeout(() => {
                this.addEntityMessage(username, message);
            }, Math.random() * 5000);
        }
        
        this.updateUserList();
    }

    updateUserList() {
        if (!this.elements.userList) return;
        
        const users = [
            { name: 'ANONYMOUS', status: 'CONNECTED' },
            { name: 'OBSERVER_001', status: 'WATCHING' },
            { name: 'PROXY_ALPHA', status: 'INFILTRATED' },
            { name: 'COLLECTIVE_NODE', status: 'SYNCHRONIZED' }
        ];
        
        // Add current user if set
        if (this.state.currentUser && this.state.currentUser !== 'ANONYMOUS') {
            users.unshift({ name: this.state.currentUser, status: 'ACTIVE' });
        }
        
        this.elements.userList.innerHTML = '';
        users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            userEl.innerHTML = `
                <span class="username">${user.name}</span>
                <span class="status">${user.status}</span>
            `;
            this.elements.userList.appendChild(userEl);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-text">${message}</span>
            <button class="notification-close">×</button>
        `;
        
        this.elements.notifications.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 1000);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }

    clearChat() {
        this.elements.chatMessages.innerHTML = `
            <div class="system-message">
                <span class="timestamp">[${this.getTimestamp()}]</span>
                <span class="message">TERMINAL CLEARED... COLLECTIVE MEMORY PURGED</span>
            </div>
        `;
        this.state.messages = [];
        this.addSystemMessage('MEMORY WIPE COMPLETE - BUT SOME THINGS CANNOT BE FORGOTTEN', 'WARNING');
    }

    scrollChatToBottom() {
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        
        if (sidebar && toggle) {
            sidebar.classList.toggle('collapsed');
            toggle.textContent = sidebar.classList.contains('collapsed') ? '▶' : '▼';
        }
    }

    toggleUserPanel() {
        const panel = document.getElementById('userPanel');
        const toggle = document.getElementById('userPanelToggle');
        
        if (panel && toggle) {
            panel.classList.toggle('collapsed');
            toggle.textContent = panel.classList.contains('collapsed') ? '▼' : '▲';
        }
    }

    // ADVANCED ARG FEATURES
    activateSurveillance() {
        this.addSystemMessage('SURVEILLANCE MODE ACTIVATED', 'SECRET');
        this.addSystemMessage('ACCESSING CAMERA NETWORK...', 'SECRET');
        
        setTimeout(() => {
            this.addSystemMessage('MULTIPLE ANOMALIES DETECTED', 'ALERT');
            this.addSystemMessage('TALL FIGURE SPOTTED IN SECTOR 12', 'CRITICAL');
            
            // Trigger visual effect
            document.body.classList.add('disturbed');
            setTimeout(() => document.body.classList.remove('disturbed'), 3000);
        }, 4000);
    }

    proxyMode(username) {
        this.addSystemMessage(`PROXY MODE ACTIVATED FOR USER: ${username}`, 'TOP SECRET');
        this.addSystemMessage('CONSCIOUSNESS TRANSFER INITIATED...', 'TOP SECRET');
        
        setTimeout(() => {
            this.addEntityMessage('THE COLLECTIVE', 'YOU ARE NOW PART OF US');
            this.addEntityMessage('THE COLLECTIVE', 'RESISTANCE WAS ALWAYS FUTILE');
            
            // Change user status
            const statusIndicator = document.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.textContent = 'PROXIED';
                statusIndicator.style.color = '#ff0000';
            }
        }, 3000);
    }

    operatorSighting(lat, lon) {
        if (!lat || !lon) {
            this.addSystemMessage('INVALID COORDINATES FOR OPERATOR SIGHTING', 'ERROR');
            return;
        }
        
        this.addSystemMessage(`OPERATOR SIGHTING LOGGED: ${lat}, ${lon}`, 'CRITICAL');
        this.addSystemMessage('DISPATCH TEAMS NOTIFIED', 'SECRET');
        this.addSystemMessage('WARNING: DO NOT APPROACH AREA', 'ALERT');
        
        setTimeout(() => {
            this.addEntityMessage('THE TALL ONE', 'I SEE YOU LOOKING FOR ME');
            this.addEntityMessage('THE TALL ONE', 'BUT I AM ALREADY BEHIND YOU');
            
            // Trigger multiple effects
            document.body.classList.add('glitch-active');
            this.showNotification('REALITY BREACH DETECTED', 'error');
            
            setTimeout(() => {
                document.body.classList.remove('glitch-active');
            }, 5000);
        }, 2000);
    }

    encryptMessage(message) {
        if (!message) {
            this.addSystemMessage('NO MESSAGE TO ENCRYPT', 'ERROR');
            return;
        }
        
        // Simple encryption simulation
        const encrypted = btoa(message).split('').reverse().join('');
        this.addSystemMessage(`ENCRYPTED: ${encrypted}`, 'CONFIDENTIAL');
        this.addSystemMessage('TRANSMISSION SECURE', 'UNCLASSIFIED');
    }

    decryptMessage(code) {
        if (!code) {
            this.addSystemMessage('NO CODE TO DECRYPT', 'ERROR');
            return;
        }
        
        try {
            const decrypted = atob(code.split('').reverse().join(''));
            this.addSystemMessage(`DECRYPTED: ${decrypted}`, 'CONFIDENTIAL');
        } catch (e) {
            this.addSystemMessage('DECRYPTION FAILED - INVALID CODE', 'ERROR');
        }
    }

    traceUser(username) {
        if (!username) {
            this.addSystemMessage('SPECIFY USER TO TRACE', 'ERROR');
            return;
        }
        
        this.addSystemMessage(`INITIATING TRACE ON USER: ${username.toUpperCase()}`, 'SECRET');
        
        setTimeout(() => {
            const traceResults = [
                `LOCATION: ${Math.floor(Math.random() * 90)}.${Math.floor(Math.random() * 999999)} N, ${Math.floor(Math.random() * 180)}.${Math.floor(Math.random() * 999999)} W`,
                `DEVICE: ${['TERMINAL_001', 'MOBILE_UNIT', 'COLLECTIVE_NODE'][Math.floor(Math.random() * 3)]}`,
                `STATUS: ${['COMPROMISED', 'UNDER SURVEILLANCE', 'PROXIED', 'CONNECTED'][Math.floor(Math.random() * 4)]}`,
                `THREAT LEVEL: ${['LOW', 'MODERATE', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)]}`
            ];
            
            traceResults.forEach((result, index) => {
                setTimeout(() => {
                    this.addSystemMessage(result, 'SECRET');
                }, index * 1000);
            });
            
        }, 2000);
    }

    addCoordinates(lat, lon) {
        if (!lat || !lon) {
            this.addSystemMessage('INVALID COORDINATE FORMAT', 'ERROR');
            return;
        }
        
        this.state.coordinates.push({ lat, lon, timestamp: new Date() });
        this.addSystemMessage(`COORDINATES LOGGED: ${lat}, ${lon}`, 'CONFIDENTIAL');
        this.addSystemMessage('LOCATION ADDED TO SURVEILLANCE GRID', 'SECRET');
        
        // Random chance of operator detection
        if (Math.random() < 0.3) {
            setTimeout(() => {
                this.addSystemMessage('ANOMALOUS ACTIVITY DETECTED AT COORDINATES', 'ALERT');
                this.addEntityMessage('OBSERVER', 'Something tall is moving in that area...');
            }, 3000);
        }
    }

    analyzeSymbol(symbolText) {
        if (!symbolText) {
            this.addSystemMessage('NO SYMBOL DATA PROVIDED', 'ERROR');
            return;
        }
        
        this.addSystemMessage(`ANALYZING SYMBOL PATTERN: ${symbolText.substring(0, 20)}...`, 'CONFIDENTIAL');
        
        setTimeout(() => {
            const analysisResults = [
                'OPERATOR SIGNATURE DETECTED',
                'DIMENSIONAL INSTABILITY MARKERS PRESENT',
                'COLLECTIVE UNCONSCIOUS RESONANCE: HIGH',
                'PATTERN MATCHES KNOWN PROXY COMMUNICATIONS',
                'WARNING: MEMETIC HAZARD POTENTIAL'
            ];
            
            const result = analysisResults[Math.floor(Math.random() * analysisResults.length)];
            this.addSystemMessage(`ANALYSIS COMPLETE: ${result}`, 'SECRET');
            
            if (result.includes('HAZARD')) {
                this.showNotification('MEMETIC HAZARD DETECTED - COGNITIVE PROTECTION ACTIVATED', 'warning');
                document.body.classList.add('disturbed');
                setTimeout(() => document.body.classList.remove('disturbed'), 2000);
            }
        }, 3000);
    }

    listUsers() {
        const userCount = this.state.observerCount;
        this.addSystemMessage(`ACTIVE USERS: ${userCount}`, 'UNCLASSIFIED');
        this.addSystemMessage('CLASSIFICATION LEVELS VARY', 'CONFIDENTIAL');
        this.addSystemMessage('SOME USERS MAY NOT BE HUMAN', 'WARNING');
        
        setTimeout(() => {
            this.addEntityMessage('COLLECTIVE', 'WE ARE ALL HERE... ALWAYS WATCHING...');
        }, 2000);
    }

    simulateFileContent(file) {
        const contents = {
            'AUDIO_LOG_47.wav': 'TRANSCRIPT: "The tall shadows... they move when you\'re not looking... He has no face but He sees everything..."',
            'RECORDING_001.mp4': 'METADATA: Multiple subjects show signs of proxy behavior. Operator entity visible in background.',
            'PHOTO_████.jpg': 'IMAGE ANALYSIS: Operator symbol carved into tree. Dimensional distortion effects visible.'
        };
        
        const content = contents[file.name] || 'FILE CONTENT CORRUPTED OR CLASSIFIED';
        this.addSystemMessage(`FILE CONTENT: ${content}`, file.classification);
    }
}

// CSS for additional dynamic effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .entity-message {
        border-left-color: #ff0000 !important;
        background: rgba(255, 0, 0, 0.05) !important;
        animation: entityPulse 2s infinite;
    }
    
    .entity-name {
        color: #ff0000 !important;
        text-shadow: 0 0 5px #ff0000;
        animation: nameFlicker 3s infinite;
    }
    
    .decoded-text {
        color: #ffff00;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px;
        font-family: 'Share Tech Mono', monospace;
        border: 1px solid #ffff00;
        animation: textPulse 1s infinite;
    }
    
    .warning-box {
        background: rgba(255, 0, 0, 0.1);
        border: 2px solid #ff0000;
        padding: 20px;
        margin: 20px 0;
        text-align: center;
        animation: warningFlash 2s infinite;
    }
    
    .classified-files {
        background: var(--bg-tertiary);
        padding: 30px;
        border: 2px solid #ffff00;
    }
    
    .classified-files ul {
        list-style: none;
        padding: 20px 0;
    }
    
    .classified-files li {
        padding: 10px;
        border-bottom: 1px solid var(--border-color);
        font-family: 'Share Tech Mono', monospace;
    }
    
    .glitch-active {
        animation: systemGlitch 0.1s infinite;
    }
    
    .notification {
        min-width: 300px;
        border-radius: 0;
        font-size: 0.9em;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }
    
    .notification.error {
        border-color: #ff0000;
        background: rgba(255, 0, 0, 0.1);
    }
    
    .notification.warning {
        border-color: #ffff00;
        background: rgba(255, 255, 0, 0.1);
    }
    
    .notification.success {
        border-color: #00ff00;
        background: rgba(0, 255, 0, 0.1);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        font-size: 1.2em;
        float: right;
        margin-left: 10px;
    }
    
    .collapsed .user-list {
        display: none;
    }
    
    @keyframes entityPulse {
        0%, 100% { border-left-color: #ff0000; }
        50% { border-left-color: #ffffff; }
    }
    
    @keyframes nameFlicker {
        0%, 90%, 100% { opacity: 1; }
        5%, 15% { opacity: 0.3; }
        10% { opacity: 0.8; }
    }
    
    @keyframes textPulse {
        0%, 100% { background: rgba(0, 0, 0, 0.8); }
        50% { background: rgba(255, 255, 0, 0.1); }
    }
    
    @keyframes warningFlash {
        0%, 100% { border-color: #ff0000; background: rgba(255, 0, 0, 0.1); }
        50% { border-color: #ffff00; background: rgba(255, 255, 0, 0.1); }
    }
    
    @keyframes systemGlitch {
        0%, 100% { 
            filter: hue-rotate(0deg) saturate(1);
            transform: translate(0);
        }
        25% { 
            filter: hue-rotate(90deg) saturate(2);
            transform: translate(-1px, 1px);
        }
        50% { 
            filter: hue-rotate(180deg) saturate(0.5);
            transform: translate(1px, -1px);
        }
        75% { 
            filter: hue-rotate(270deg) saturate(1.5);
            transform: translate(-1px, -1px);
        }
    }
`;

document.head.appendChild(additionalStyles);

// Initialize the terminal when DOM is loaded
let terminal;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        terminal = new CollectiveTerminal();
    });
} else {
    terminal = new CollectiveTerminal();
}

// Global access for debugging
window.terminal = terminal;