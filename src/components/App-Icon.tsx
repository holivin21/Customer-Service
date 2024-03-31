import { ThemedTitleV2 } from "@refinedev/chakra-ui";
import { IconMoonStars } from "@tabler/icons";

export default function AppIcon() {
    return (
        <ThemedTitleV2
            text="Customer Support Service"
            icon={<IconMoonStars size="1.5rem" />}
            collapsed={false}
        />
    )
}