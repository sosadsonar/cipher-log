export default {
  id: 4,
  date: "2023-11-20",
  content: {
    EN: {
      title: "Wireless Handshake Decryption",
      summary: "Cracking WPA2 PMKIDs using hashcat and modern GPU clusters.",
      body: `
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
    VN: {
      title: "Giải Mã Handshake Không Dây",
      summary: "Bẻ khóa WPA2 PMKID sử dụng hashcat và các cụm GPU hiện đại.",
      body: `
        # SÓNG VÔ TUYẾN BỊ XÂM NHẬP
        
        Bạn không phải lúc nào cũng cần bắt trọn vẹn 4-way handshake. Cuộc tấn công PMKID trên WPA2 cho phép lấy hash trực tiếp từ Access Point mà không cần client kết nối.
        
        ## Chuỗi Công Cụ
        1. hcxdumptool để bắt gói tin
        2. hcxpcapngtool để chuyển đổi
        3. hashcat -m 16800 để bẻ khóa
        
        ## Phòng Thủ
        Sử dụng WPA3. Nó thay thế trao đổi PSK bằng SAE (Xác thực Đồng thời Ngang hàng), làm cho các cuộc tấn công từ điển offline trở nên lỗi thời.
      `
    }
  }
};