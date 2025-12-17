export default {
  id: 1,
  date: "2023-10-27",
  content: {
    EN: {
      title: "SQL Injection: Beyond the Basics",
      summary: "Exploring second-order injections and blind SQLi techniques in modern web frameworks.",
      body: `
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
    VN: {
      title: "SQL Injection: Hơn Cả Cơ Bản",
      summary: "Khám phá injection bậc hai và kỹ thuật SQLi mù trong các framework web hiện đại.",
      body: `
        # MỤC TIÊU ĐÃ XÁC ĐỊNH: CƠ SỞ DỮ LIỆU
        
        SQL injection tiêu chuẩn thường bị WAF chặn. Tuy nhiên, injection bậc hai vẫn là một mối đe dọa tiềm tàng.
        Trong vector này, payload được ứng dụng lưu trữ (ví dụ: trong hồ sơ người dùng) và thực thi sau đó
        khi một chức năng khác truy cập dữ liệu đó.

        ## Điểm Mù
        Blind injection dựa trên thời gian cho phép trích xuất dữ liệu bằng cách hỏi cơ sở dữ liệu các câu hỏi đúng/sai.
        IF(1=1, SLEEP(5), 0). Nếu máy chủ bị treo, chúng ta biết điều kiện của mình là đúng.
        
        ## Biện Pháp Khắc Phục
        Prepared statements là bắt buộc. Xác thực đầu vào là biện pháp phòng thủ chuyên sâu, không phải là thuốc chữa.
      `
    }
  }
};