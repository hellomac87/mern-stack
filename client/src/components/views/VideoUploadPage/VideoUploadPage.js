import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles " },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" }
];

function VideoUploadPage() {
  const [vidoeTitle, setVideoTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [_private, setPrivate] = useState(0);
  const [category, setCategory] = useState("Film & Animation");

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChange = e => {
    setDiscription(e.currentTarget.value);
  };

  const onPrivateChange = e => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = e => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    console.log(files);
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then(res => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert("업로드 실패");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>

        <Form onSubmit>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Drop zone */}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    display: "flex",
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Icon type="plus" style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>

            {/* ThumbNail */}
            <div>
              <img src alt />
            </div>
          </div>

          <br />
          <br />
          <label>Title</label>
          <Input onChange={onTitleChange} value={vidoeTitle} />
          <br />
          <br />
          <label>Description</label>
          <TextArea onChange={onDescriptionChange} value={description} />
          <br />
          <br />
          <select onChange={onPrivateChange}>
            {PrivateOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <select onChange={onCategoryChange}>
            {CategoryOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Button type="primary" size="large" onClick>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default VideoUploadPage;
