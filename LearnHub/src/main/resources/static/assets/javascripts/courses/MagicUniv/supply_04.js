// 선택 상자 요소와 이미지 요소를 가져옵니다.
const imageSelect = document.getElementById('image-select');
const selectedImage = document.getElementById('selected-image');

// 선택 상자의 변경을 감지하고 선택된 이미지를 표시합니다.
imageSelect.addEventListener('change', function() {
    const selectedValue = imageSelect.value;
    selectedImage.src = selectedValue;
});
