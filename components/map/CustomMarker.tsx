import { Marker, Tooltip } from "react-leaflet";

interface CustomMarkerProps {
  position: [number, number];
  name: string;
}

export default ({ position, name }: CustomMarkerProps) => {
  return (
    <Marker position={position}>
      <Tooltip direction="bottom">
        {name}
      </Tooltip>
    </Marker>
  );
};
