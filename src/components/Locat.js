import React, { Component } from 'react';

class Locat extends Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      errorMessage: null,
      userAgent: null, // เพิ่ม state สำหรับ User Agent
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            errorMessage: null,
            userAgent: navigator.userAgent, // ดึงข้อมูล User Agent
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.setState({ errorMessage: "คุณต้องเปิดการอนุญาตการเข้าถึงตำแหน่งของคุณ" });
          } else {
            this.setState({ errorMessage: error.message });
          }
        }
      );
    } else {
      this.setState({ errorMessage: "เราไม่สามารถเข้าถึงข้อมูลตำแหน่งของคุณ" });
    }
  }

  render() {
    const { latitude, longitude, errorMessage, userAgent } = this.state;

    return (
      <div>
        <h1>ข้อมูลตำแหน่งผู้ใช้</h1>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div>
            <p>ละติจูด: {latitude}</p>
            <p>ลองจิจูด: {longitude}</p>
            <p>User Agent: {userAgent}</p> {/* แสดงข้อมูล User Agent */}
          </div>
        )}
      </div>
    );
  }
}

export default Locat;
