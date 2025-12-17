export default {
  id: 5,
  date: "2023-12-05",
  content: {
    EN: {
      title: "Buffer Overflow 101",
      summary: "Smashing the stack for fun and profit. Understanding memory management flaws.",
      body: `
        # MEMORY CORRUPTION
        
        When a program writes more data to a buffer than it holds, the excess data overwrites adjacent memory.
        
        ## EIP Control
        The goal is to overwrite the Instruction Pointer (EIP/RIP) to point to our shellcode instead of the next legitimate instruction.
        
        ## NOP Sled
        0x90. A sequence of 'No Operation' instructions used to slide the CPU execution into our payload.
      `
    },
    VN: {
      title: "Buffer Overflow 101",
      summary: "Phá hủy stack để trục lợi. Hiểu về các lỗi quản lý bộ nhớ.",
      body: `
        # THAM NHŨNG BỘ NHỚ
        
        Khi một chương trình ghi nhiều dữ liệu vào bộ đệm hơn khả năng chứa, dữ liệu dư thừa sẽ ghi đè lên bộ nhớ liền kề.
        
        ## Kiểm Soát EIP
        Mục tiêu là ghi đè lên Con trỏ Lệnh (EIP/RIP) để trỏ đến shellcode của chúng ta thay vì lệnh hợp lệ tiếp theo.
        
        ## NOP Sled
        0x90. Một chuỗi các lệnh 'No Operation' được sử dụng để trượt quá trình thực thi của CPU vào payload của chúng ta.
      `
    }
  }
};