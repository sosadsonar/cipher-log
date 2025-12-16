export const BLOG_POSTS = [
  {
    id: 1,
    title: "SQL Injection: Beyond the Basics",
    summary: "Exploring second-order injections and blind SQLi techniques in modern web frameworks.",
    date: "2023-10-27",
    content: `
      # TARGET ACQUIRED: DATABASE
      
      Standard SQL injection is often caught by WAFs. However, second-order injection remains a potent threat. 
      In this vector, the payload is stored by the application (e.g., in a user profile) and executed later 
      when a different function accesses that data.

      ## The Blind Spot
      Time-based blind injection allows data extraction by asking true/false questions to the database.
      IF(1=1, SLEEP(5), 0). If the server hangs, we know our condition is true.
      
      ## Remediation
      Prepared statements are non-negotiable. Input validation is a defense-in-depth measure, not a cure.
    `
  },
  {
    id: 2,
    title: "The Flipper Zero Ecosystem",
    summary: "Analyzing the hardware capabilities of the ultimate multi-tool for pentesting.",
    date: "2023-11-02",
    content: `
      # HARDWARE INTERFACE
      
      The Flipper Zero isn't just a toy; it's a sub-1GHz transceiver, RFID emulator, and NFC writer packed into a Tamagotchi.
      
      ## Sub-1GHz Replay
      Capturing raw signals from garage doors and barriers. Rolling codes prevent simple replay attacks, 
      but 'RollJam' techniques can still be effective if the timing is right.
      
      ## BadUSB
      By emulating a HID (Human Interface Device), scripts can execute commands at typing speed immediately upon insertion.
    `
  },
  {
    id: 3,
    title: "Social Engineering: The Human Firewall",
    summary: "Why 2FA fails when the user is the vulnerability. Pretexting and psychological triggers.",
    date: "2023-11-15",
    content: `
      # LAYER 8 VULNERABILITY
      
      Technology can be patched. Psychology cannot. 
      
      ## Pretexting
      Creating a fabricated scenario (the pretext) to compel a target to release information. 
      "This is IT support, we noticed unusual activity on your account..."
      
      ## Urgency & Fear
      The primary drivers of successful phishing. By inducing panic, cognitive load increases, and critical thinking decreases.
    `
  },
  {
    id: 4,
    title: "Wireless Handshake Decryption",
    summary: "Cracking WPA2 PMKIDs using hashcat and modern GPU clusters.",
    date: "2023-11-20",
    content: `
      # AIRWAVES COMPROMISED
      
      You don't always need a full 4-way handshake. The PMKID attack on WPA2 allows us to retrieve the hash directly from the Access Point without a client connection.
      
      ## The Toolchain
      1. hcxdumptool for capture
      2. hcxpcapngtool for conversion
      3. hashcat -m 16800 for the crack
      
      ## Defense
      Use WPA3. It replaces the PSK exchange with SAE (Simultaneous Authentication of Equals), rendering offline dictionary attacks obsolete.
    `
  },
  {
    id: 5,
    title: "Buffer Overflow 101",
    summary: "Smashing the stack for fun and profit. Understanding memory management flaws.",
    date: "2023-12-05",
    content: `
      # MEMORY CORRUPTION
      
      When a program writes more data to a buffer than it holds, the excess data overwrites adjacent memory.
      
      ## EIP Control
      The goal is to overwrite the Instruction Pointer (EIP/RIP) to point to our shellcode instead of the next legitimate instruction.
      
      ## NOP Sled
      0x90. A sequence of 'No Operation' instructions used to slide the CPU execution into our payload.
    `
  },
  {
    id: 6,
    title: "Zero-Day Markets",
    summary: "An investigation into the dark economy of undisclosed vulnerabilities.",
    date: "2023-12-12",
    content: `
      # HIGHEST BIDDER
      
      Vulnerabilities are currency. Governments, brokers, and criminals bid on exploits that have no patch.
      
      ## Browser Exploits
      A full-chain RCE (Remote Code Execution) for Chrome or Safari can fetch upwards of $500,000 on the gray market.
      
      ## Ethics
      To disclose or to sell? The eternal dilemma of the white hat researcher.
    `
  }
];