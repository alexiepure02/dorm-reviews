import { usePathname, useRouter } from "next/navigation";
import { Marker, Tooltip } from "react-leaflet";

interface CustomMarkerProps {
  position: [number, number];
  id: string;
  name: string;
}

export default ({ position, id, name }: CustomMarkerProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const goToLocation = () => router.push(pathname + "/" + id);

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: goToLocation,
      }}
    >
      <Tooltip direction="bottom">{name}</Tooltip>
    </Marker>
  );
};
