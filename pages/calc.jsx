import { useRef } from "react";
import { useState } from "react";

export default function Page() {
  const [type, setType] = useState();
  const typeRef = useRef();
  const heightRef = useRef();
  const lengthRef = useRef();
  const widthRef = useRef();
  const ratioRef = useRef();
  const bigRef = useRef();
  const [res, setRes] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <div className="w-96">
        <p>规则：</p>
        <br/>
        <p>包板：</p>
        <p>
          大窑(窑板尺寸:50x55cm)：1-5cm24元，6-8cm27元;9-10cm32 元;11-12cm37元，超出部分每公分加2.5元;
        </p>
        <p>
          小窑(窑板尺寸:50x48cm):包板:1-5cm22元，6-8cm24元;9-10cm27元;11-12cm32元，超出部分每公分加2元;
        </p>
        <br/>
        <p>单烧：</p>
        <p>马克杯 咖啡杯 碗 壶 3元。</p>
        <p>小号杯子1元。(按大小收费)</p>
        <p>盘子：</p>
        <p>
          15公分以内3元；16-20公分5-8元；21-30公分10-15元；大于35公分按包板收费。
        </p>
        <p>大瓷板：</p>
        <p>40-55x60cm35元,60x60cm60元 长宽都超出60cm按1块钱1公分。</p>
      </div>
      <div className=" py-4">
        <label>选择类型：</label>
        <select ref={typeRef} onChange={() => setType(typeRef.current.value)}>
          <option value={-1}>请选择</option>
          <option value={0}>包板</option>
          <option value={1}>马克杯.咖啡杯.碗.壶</option>
          <option value={2}>小号杯子</option>
          <option value={3}>盘子</option>
          <option value={4}>瓷板</option>
        </select>
      </div>
      {type == 0 && (
        <>
          <div>
            <label>请输入高度：</label>
            <input ref={heightRef}></input>
          </div>
          <div>
            <label>请选择窑大小：</label>
            <select ref={bigRef}>
              <option value={0}>大窑</option>
              <option value={1}>小窑</option>
            </select>
          </div>
        </>
      )}
      {type == 3 && (
        <>
          <div>
            <label>请输入高度：</label>
            <input ref={heightRef}></input>
          </div>
          <div>
            <label>请输入直径：</label>
            <input ref={ratioRef}></input>
          </div>
          <div>
            <label>请选择窑大小：</label>
            <select ref={bigRef}>
              <option value={0}>大窑</option>
              <option value={1}>小窑</option>
            </select>
          </div>
        </>
      )}
      {type == 4 && (
        <>
          <div>
            <label>请输入长度：</label>
            <input ref={lengthRef}></input>
          </div>
          <div>
            <label>请输入宽度：</label>
            <input ref={widthRef}></input>
          </div>
        </>
      )}
      <button
        className=" border border-collapse"
        onClick={() => {
          if (typeRef.current.value == 0) {
            setRes(byHeight(heightRef.current.value, bigRef.current.value));
          } else if (typeRef.current.value == 1) {
            setRes(3);
          } else if (typeRef.current.value == 2) {
            setRes(1);
          } else if (typeRef.current.value == 3) {
            const ratio = ratioRef.current.value;
            if (ratio < 15) {
              setRes(3);
            } else if (ratio < 20) {
              setRes("5-8");
            } else if (ratio < 35) {
              setRes("10-15");
            } else {
              setRes(byHeight(heightRef.current.value, bigRef.current.value));
            }
          } else if (typeRef.current.value == 4) {
            if (lengthRef.current.value > 60 || widthRef.current.value > 60) {
              setRes(Math.max(lengthRef.current.value, widthRef.current.value));
            } else if (
              lengthRef.current.value < 55 ||
              widthRef.current.value < 55
            ) {
              setRes(35);
            } else {
              setRes(60);
            }
          }
        }}
      >
        点击计算
      </button>
      结果是：{res}元。
    </div>
  );
}

function byHeight(height, big) {
  if (big == 0) {
    if (height >= 12) {
      return (height - 12) * 2.5 + 37;
    } else if (height >= 11) {
      return 37;
    } else if (height >= 9) {
      return 32;
    } else if (height >= 6) {
      return 27;
    } else if (height >= 1) {
      return 24;
    } else {
      return 0;
    }
  } else {
    if (height >= 12) {
      return (height - 12) * 22 + 32;
    } else if (height >= 11) {
      return 32;
    } else if (height >= 9) {
      return 27;
    } else if (height >= 6) {
      return 24;
    } else if (height >= 1) {
      return 22;
    } else {
      return 0;
    }
  }
}
