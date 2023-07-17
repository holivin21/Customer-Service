import { Box, Modal, Typography } from "@mui/material";
import { useGo } from "@refinedev/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThankYouImage from "public/images/thank_you.svg";

const ModalThankYou = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void, }) => {
    const [count, setCount] = useState<number>(5);
    const go = useGo();
    useEffect(() => {
        setCount(5);
    }, [isOpen]);
    useEffect(() => {
        let interval: any = null;
        if (count !== 0) {
            interval = setInterval(() => {
                setCount(count - 1);
            }, 1000);
        } else if (count === 0) {
            clearInterval(interval);
            if (isOpen) go({ to: "/" })
        }
        return () => clearInterval(interval);
    }, [count]);
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box display="flex" height="100%" alignItems="center" justifyContent="center">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2} bgcolor="white" height="60%" p={4} borderRadius={4}>
                    <Image style={{ objectFit: "fill", width: "60%", height: "60%", textAlign: "center" }} src={ThankYouImage} alt="ThankYouImage" priority={false} />
                    <Typography variant="h4">Thank You for Using Our Service.</Typography>
                    <Typography variant="h6">Back to home in ... {count}</Typography>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalThankYou;