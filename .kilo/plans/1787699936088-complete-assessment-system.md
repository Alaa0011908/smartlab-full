# Complete Assessment System - Remaining Work

## Current State
- `generate-questions.js` has 3 sections (general-concepts, ipv4, subnetting) = 126 questions
- Target: 8 sections with 30 comprehensive + 12 quick each = 336 total questions
- Missing 5 sections: ipv6, osi-model, network-devices, email-protocols, tcp-ip

## Tasks

### 1. Add 5 Missing Sections to `generate-questions.js`
**File**: `generate-questions.js`

Add the following section arrays before the `// Write output file` line (line 175):

**Section 4: ipv6** (30 comprehensive + 12 quick questions)
- IPv6 address structure (128-bit, 8 groups of hex)
- IPv6 notation and shorthand rules
- IPv6 address types: Unicast, Multicast, Anycast
- Link-Local addresses (FE80::/10)
- Unique Local addresses (FC00::/7)
- Global Unicast addresses (2000::/3)
- Loopback (::1) and Unspecified (::)
- SLAAC (Stateless Address Autoconfiguration)
- NDP (Neighbor Discovery Protocol)
- Dual Stack mechanism
- Tunneling (6to4, Teredo)
- IPv6 header structure
- Migration strategies from IPv4 to IPv6

**Section 5: osi-model** (30 comprehensive + 12 quick questions)
- 7 layers of OSI model (names, order, functions)
- Layer 1: Physical (signals, cables, hubs, repeaters)
- Layer 2: Data Link (MAC, switches, bridges, frames)
- Layer 3: Network (IP, routers, packets, routing)
- Layer 4: Transport (TCP, UDP, segments, ports)
- Layer 5: Session (session management, authentication)
- Layer 6: Presentation (encryption, compression, formatting)
- Layer 7: Application (HTTP, FTP, SMTP, DNS)
- PDU names at each layer
- Encapsulation/decapsulation process
- Protocols at each layer
- Devices at each layer

**Section 6: network-devices** (30 comprehensive + 12 quick questions)
- Router: functions, routing tables, routing protocols (OSPF, BGP, RIP)
- Switch: MAC table, VLANs, STP, Layer 2/3 switches
- Hub: Layer 1, broadcasting, collision domains
- Bridge: connecting network segments, filtering
- Firewall: packet filtering, stateful inspection, proxy, WAF
- Access Point: wireless networks, SSID, BSS, ESS
- Load Balancer: distribution algorithms, health checks
- Proxy Server: forward/reverse proxy, caching
- Modem: modulation/demodulation, DSL, cable
- Gateway: protocol translation, connecting dissimilar networks
- Repeater: signal amplification
- NIC: MAC address, device connectivity

**Section 7: email-protocols** (30 comprehensive + 12 quick questions)
- SMTP: port 25/587, sending mail, commands (HELO, MAIL FROM, RCPT TO, DATA)
- POP3: port 110, downloading mail, deleting from server
- IMAP: port 143, syncing mail, server-side storage
- SMTPS: port 465, SMTP over SSL/TLS
- IMAPS: port 993, IMAP over SSL/TLS
- POP3S: port 995, POP3 over SSL/TLS
- Email message format: headers, body, attachments (MIME)
- DNS MX records for mail routing
- Authentication methods: LOGIN, PLAIN, CRAM-MD5
- Spam filtering: SPF, DKIM, DMARC
- Mail flow: sender → MTA → MDA → recipient
- Webmail vs desktop email clients

**Section 8: tcp-ip** (30 comprehensive + 12 quick questions)
- TCP: connection-oriented, reliable, flow control, congestion control
- UDP: connectionless, fast, unreliable, use cases
- Three-Way Handshake: SYN, SYN-ACK, ACK
- Four-Way Handshake (connection termination): FIN, ACK
- TCP flags: SYN, ACK, FIN, RST, PSH, URG
- Sequence and Acknowledgment numbers
- Sliding window mechanism
- TCP vs UDP comparison
- Well-known ports: 20/21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS), 80 (HTTP), 443 (HTTPS)
- DHCP: DORA process, lease, ports 67/68
- DNS: resolution process, record types (A, AAAA, CNAME, MX, NS)
- ARP: IP to MAC resolution, ARP cache
- ICMP: ping, traceroute, error reporting
- TCP/IP model layers vs OSI model

### 2. Update Output Template
Update the comment in the output template from:
```
// عدد الأسئلة: ${questions.length} سؤالاً (8 محاور رئيسية)
```
Keep as is - it already says 8 محاور رئيسية (8 main axes), which is correct.

### 3. Run Generation Script
```bash
node generate-questions.js
```
Expected output: `Generated 336 questions`

### 4. Verify Generated File
**File**: `data/questions/basics.js`
- Confirm file exists and has 336 questions
- Verify `getAssessmentQuestions()` filters correctly for each of 8 categories
- Check that `getAssessmentInfo()` returns correct info for all 8 categories

### 5. Test Locally
```bash
npm run dev
```
- Navigate to assessment page
- Verify all 8 categories appear
- Test selecting each category in both quick and full modes
- Verify questions load correctly

### 6. Build and Verify
```bash
npm run build
```
- Ensure build passes with no errors
- Fix any issues if they arise

### 7. Deploy
- Commit all changes with message: "Complete assessment system with 336 questions across 8 sections"
- Push to GitHub
- User performs Manual Deploy on Render Dashboard

## Validation Checklist
- [ ] `generate-questions.js` has all 8 sections
- [ ] Running `node generate-questions.js` produces 336 questions
- [ ] `data/questions/basics.js` is updated
- [ ] All 8 categories appear in assessment selection
- [ ] Quick mode shows 12 questions per category
- [ ] Full mode shows 30 questions per category
- [ ] Build passes successfully
- [ ] Code pushed to GitHub
