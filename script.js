window.renderMergeSortApp = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container #${containerId} not found`);
        return;
    }

    container.innerHTML = `
    <div class="container">
        <h1>Merge Sort Visualization</h1>
        <div class="controls">
            <input id="0" type="number" class="box" />
            <input id="1" type="number" class="box" />
            <input id="2" type="number" class="box" />
            <input id="3" type="number" class="box" />
            <input id="4" type="number" class="box" />
            <input id="5" type="number" class="box" />
        </div>
        <button class="sortBtn" id="sortBtn">Start Sort</button>
        <div class="playArea" id="playArea">
            <div class="divideArea area" id="divideArea"></div>
            <div class="outPutArea area" id="outPutArea"></div>
            <div class="resultArea area" id="resultArea"></div>
        </div>
    </div>
`;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const divideArea = document.getElementById("divideArea");
    const outPutArea = document.getElementById("outPutArea");
    const resultElement = document.getElementById("resultArea");

    // Visualize merging
    const merge = async (arr1, arr2) => {
        let p1 = 0;
        let p2 = 0;
        let tempArr = [];

        // Create a new element for merging visualization
        const mergeElement = document.createElement("div");
        mergeElement.classList.add("mergeEle");
        outPutArea.appendChild(mergeElement);

        while (p1 < arr1.length && p2 < arr2.length) {
            await delay(300);
            if (arr1[p1] <= arr2[p2]) {
                tempArr.push(arr1[p1]);
                p1++;
            } else {
                tempArr.push(arr2[p2]);
                p2++;
            }
            mergeElement.textContent = `Merging: ${tempArr.join(", ")}`;
        }

        // Append remaining elements
        while (p1 < arr1.length) {
            await delay(300);
            tempArr.push(arr1[p1]);
            p1++;
            mergeElement.textContent = `Merging: ${tempArr.join(", ")}`;
        }
        while (p2 < arr2.length) {
            await delay(300);
            tempArr.push(arr2[p2]);
            p2++;
            mergeElement.textContent = `Merging: ${tempArr.join(", ")}`;
        }

        resultElement.textContent = `Result: ${tempArr.join(", ")}`;
        return tempArr;
    };

    // Recursive merge sort with visualization
    const mergeSort = async (arr) => {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const leftArr = arr.slice(0, mid);
        const rightArr = arr.slice(mid);

        // Visualize array division
        const divideElement = document.createElement("div");
        divideElement.classList.add("divideEle");
        divideElement.textContent = `Dividing: [${leftArr.join(", ")}] and [${rightArr.join(", ")}]`;
        divideArea.appendChild(divideElement);

        await delay(500);
        const sortedLeft = await mergeSort(leftArr);
        const sortedRight = await mergeSort(rightArr);
        return merge(sortedLeft, sortedRight);
    };

    // Event listener for sorting
    document.getElementById("sortBtn").addEventListener("click", async () => {
        const inputs = document.querySelectorAll(".box");
        const arr = Array.from(inputs).map(input => Number(input?.value || 0));

        divideArea.innerHTML = "";
        outPutArea.innerHTML = "";
        resultElement.textContent = "";

        const sortedArray = await mergeSort(arr);
        console.log("Sorted Array:", sortedArray);
    });
}

renderMergeSortApp("mergeSortContainer")