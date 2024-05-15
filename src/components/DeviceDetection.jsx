import useDeviceDetection from "../utils/useDeviceDetection";

const detectDevice = () => {
    const device = useDeviceDetection();

    return (
        <div>
            <p className="text-lg">You are using a {device} device</p>
        </div>
    );

}

export default detectDevice;