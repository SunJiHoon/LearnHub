document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 이벤트 제거

    // 폼 데이터 가져오기
    const formData = new FormData(this);

    // 서버로 데이터 전송 (이 부분은 axios, fetch 등을 사용하여 구현)
    fetch('/api/users/register', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data); // 가입 성공 메시지 출력
        })
        .catch(error => console.error('Error:', error));
});
