export class TokenUtils {
  static parseJwt(token: string): any {
    try {
      // Lấy phần payload của token (phần giữa dấu chấm)
      const base64Url = token.split('.')[1];
  
      // Chuyển Base64Url thành Base64 chuẩn
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
      // Giải mã Base64 thành chuỗi JSON
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      // Trả về đối tượng JSON từ chuỗi JSON
      return JSON.parse(jsonPayload);
  
    } catch (e) {
      console.error('JWT parsing error:', e); // Log lỗi chi tiết
      return null;
    }
  }
  
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: string): string {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);
    const timeDifference = currentTime.getTime() - pastTime.getTime();

    // Chuyển đổi khoảng thời gian thành phút, giờ, ngày, tháng và năm
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const yearsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (minutesDifference < 1) {
      return 'Vừa xong';
    } else if (minutesDifference < 60) {
      return `Cách đây ${minutesDifference} phút`;
    } else if (hoursDifference < 24) {
      return `Cách đây ${hoursDifference} giờ`;
    } else if (daysDifference < 30) {
      return `Cách đây ${daysDifference} ngày`;
    } else if (monthsDifference < 12) {
      return `Cách đây ${monthsDifference} tháng`;
    } else {
      return `Cách đây ${yearsDifference} năm`;
    }
  }
}