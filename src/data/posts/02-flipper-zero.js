export default {
  id: 2,
  date: "2023-11-02",
  content: {
    EN: {
      title: "The Flipper Zero Ecosystem",
      summary: "Analyzing the hardware capabilities of the ultimate multi-tool for pentesting.",
      body: `
        # HARDWARE INTERFACE
        
        The Flipper Zero isn't just a toy; it's a sub-1GHz transceiver, RFID emulator, and NFC writer packed into a Tamagotchi.
        
        ## Sub-1GHz Replay
        Capturing raw signals from garage doors and barriers. Rolling codes prevent simple replay attacks, 
        but 'RollJam' techniques can still be effective if the timing is right.
        
        ## BadUSB
        By emulating a HID (Human Interface Device), scripts can execute commands at typing speed immediately upon insertion.
      `
    },
    VN: {
      title: "Hệ Sinh Thái Flipper Zero",
      summary: "Phân tích khả năng phần cứng của công cụ đa năng tối thượng cho pentesting.",
      body: `
        # GIAO DIỆN PHẦN CỨNG
        
        Flipper Zero không chỉ là đồ chơi; nó là bộ thu phát sub-1GHz, trình giả lập RFID và bộ ghi NFC được gói gọn trong một Tamagotchi.
        
        ## Phát Lại Sub-1GHz
        Thu thập tín hiệu thô từ cửa gara và rào chắn. Mã cuộn (Rolling codes) ngăn chặn các cuộc tấn công phát lại đơn giản,
        nhưng kỹ thuật 'RollJam' vẫn có thể hiệu quả nếu căn đúng thời gian.
        
        ## BadUSB
        Bằng cách giả lập HID (Thiết bị Giao diện Người dùng), các tập lệnh có thể thực thi lệnh với tốc độ gõ phím ngay khi cắm vào.
      `
    }
  }
};