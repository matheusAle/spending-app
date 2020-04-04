import { useNavigation, useNavigationState } from "@react-navigation/core";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import IconContainer from "./IconContainer";
import { Icon } from "./styles";
import { getActiveRouteName } from "@/utils";

export default (({ route, icon, active = false }) => {
  const navigation = useNavigation();
  const state = useNavigationState(s => s);
  const [isActiveRoute, setActiveRoute] = useState(active);

  React.useEffect(() => {
    setActiveRoute(getActiveRouteName(state) === route);
  }, [state]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <IconContainer
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48
        }}
        pose={isActiveRoute ? 'visible' : 'hidden' }
      >
        <Icon
          name={icon}
          type={'material'}
          color={isActiveRoute ? '#6100ED' : undefined}
          size={24}
        />
      </IconContainer>
    </TouchableOpacity>
  )
});
