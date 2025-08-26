import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";

const ChatSupport = ({ onClick }: { onClick?: () => void }) => (
    <Button
        onClick={onClick}
        pill
        size="sm"
        className="fixed bottom-6 right-6 z-50 p-2 w-12 h-12 flex items-center justify-center shadow-lg rounded-full"
        title="Chat hỗ trợ"
        color="primary"
    >
        <Icon icon="solar:chat-round-dots-linear" width={24} height={24} />
    </Button>
);

export default ChatSupport;