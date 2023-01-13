function typeOfObjectId(value) {
  if (!value) {
    return null;
  }

  if (value.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  }

  return false;
}

function handleHtmlLang(dataSend){
  return `
  <h1>Xác nhận tài khoản</h1>
  <p>Xin chào. ${dataSend.sendToEmail}</p>
  <p>Bạn nhận được email này vì đã đăng ký trên website tin tức của chúng tôi</p>
  <p style="color: red">Nếu những thông tin trên là chính xác. Vui lòng click vào link bên dưới để xác nhận và hoàn tất thủ tục xác thực tài khoản</>
  <div><a href=${dataSend.urlVerify} target="_blank"><strong>Link xác nhận</strong></a></div><br>
  <div><strong><i>Xin chân thành cảm ơn!</i></strong></div>
  `;
}

module.exports = {typeOfObjectId, handleHtmlLang};
