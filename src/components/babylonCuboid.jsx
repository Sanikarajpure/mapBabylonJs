import React, { useRef, useState } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3, Vector4 } from "@babylonjs/core";

// var texture = new BABYLON.Texture(, scene);
//     mat.diffuseTexture = texture;

var columns = 6; // 6 columns
var rows = 1; // 1 row

//alien sprite
var faceUV = new Array(6);

//set all faces to same
for (var i = 0; i < 6; i++) {
  faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
}

export const SceneWithSpinningBoxes = ({ imgUrl }) => {
  const SpinningBox = (props) => {
    const boxRef = useRef(null);

    return (
      <box
        name={props.name}
        ref={boxRef}
        size={3}
        position={props.position}
        height={1}
        width={1}
        depth={0.55}
        faceUV={faceUV}
        wrap
      >
        <standardMaterial>
          <texture url={imgUrl} assignTo={"diffuseTexture"} />
        </standardMaterial>
      </box>
    );
  };
  return (
    <div className="cuboidContainer">
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={(3 * Math.PI) / 4}
            beta={Math.PI / 4}
            radius={2}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <hemisphericLight
            name="light2"
            intensity={0.4}
            direction={Vector3.Down()}
          />
          <SpinningBox
            name="Map"
            position={new Vector3(0, 0, 0)}
            color={Color3.FromHexString("#EEB8EB")}
          />
        </Scene>
      </Engine>
    </div>
  );
};

export default SceneWithSpinningBoxes;
