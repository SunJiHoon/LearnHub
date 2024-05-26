function rotate() {
    var angle = parseFloat(document.getElementById('angle').value);
    // var angle = parseFloat(document.getElementById('angle').value);
    document.getElementById('angleValue').textContent = -angle; // Displaying negative angle value

    var theta = angle * Math.PI / 180;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    var gridItems = document.querySelectorAll('.grid-item');

    // var centerX = 2; // Centering x at 0
    // var centerY = 2; // Centering y at 0
    var centerX = 0; // Centering x at 0
    var centerY = 0; // Centering y at 0

    gridItems.forEach(function(item, index) {
        var col = index % 5; // Calculate column index
        var row = Math.floor(index / 5); // Calculate row index

        // var x = col - centerX; // Centering x at 0
        // var y = centerY - row; // Centering y at 0 and flipping y-axis
        var x = col - centerX; // Centering x at 0
        var y = row - centerY; // Centering y at 0 and flipping y-axis

        // Applying rotation matrix
        var newX = cosTheta * x - sinTheta * y;
        var newY = sinTheta * x + cosTheta * y;

        // Applying the new position to the item
        // item.style.gridColumnStart = Math.round(newX) + centerX + 1; // Adjusting for centering and converting to 1-indexed
        // item.style.gridRowStart = centerY - Math.round(newY) + 1; // Adjusting for centering and flipping y-axis back to original orientation
        item.style.gridColumnStart = Math.round(newX) + 1; // Adjusting for centering and converting to 1-indexed
        item.style.gridRowStart = Math.round(newY) + 1; // Adjusting for centering and flipping y-axis back to original orientation
    });
}
