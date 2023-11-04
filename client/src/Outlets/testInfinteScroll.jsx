import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

function TestInfiniteScroll() {
  const [items, setItems] = React.useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };
    return (
      <div>
        <h1>test-infinite-scroll</h1>
        <hr />
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          height={400}
          loader={<h4>Loading...</h4>}
        >
          {items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  };

  export default TestInfiniteScroll;
