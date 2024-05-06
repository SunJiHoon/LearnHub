// 선택 상자 요소와 이미지 요소를 가져옵니다.
const imageSelect = document.getElementById('image-select');
const selectedImage = document.getElementById('selected-image');
const featureImage = document.getElementById('feature-image');
const fullyConnectedImage = document.getElementById('fullyConnected-image');
munyang = [
    "/assets/images/MagicUniv/rain.png",
    "/assets/images/MagicUniv/fire.png",
    "/assets/images/MagicUniv/leaf.png",
];

features = [
    "/assets/images/MagicUniv/featureArrow_1.jpg",
    "/assets/images/MagicUniv/featureArrow_2.jpg",
    "/assets/images/MagicUniv/featureArrow_3.jpg",
];

fullyConnected = [
    "/assets/images/MagicUniv/fullyConnected_1.JPG",
    "/assets/images/MagicUniv/fullyConnected_2.JPG",
    "/assets/images/MagicUniv/fullyConnected_3.JPG",
];

// 선택 상자의 변경을 감지하고 선택된 이미지를 표시합니다.
imageSelect.addEventListener('change', function() {
    const selectedValue = imageSelect.value;
    selectedImage.src = munyang[selectedValue];
    featureImage.src = features[selectedValue];
    fullyConnectedImage.src = fullyConnected[selectedValue];

    // if (selectedValue == "0"){
    //     featureImage.src = ""
    // }
    // else if()
});
