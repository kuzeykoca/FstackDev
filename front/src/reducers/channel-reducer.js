import {
    REGISTER_CHANNEL,
    FOCUS_CHANNEL,
    EXIT_CHANNEL,
    LOAD_CHANNEL,
    REGISTER_ALL_CHANNELS,
    SET_SERVER_MESSAGE,
} from "../actions/action-types"
import { channelContext, WriteStorage, DestroyDestroy } from "../services/storage-service"


const AllChannels = (oldchannels, newchannels) => {
    const extras = []
    for (let channel of newchannels) {
        const chFound = oldchannels.find((ch, i) => ch.uid === channel.uid)
        
        if (!chFound) {
            extras.push(channel)
        }
    }
    return [...oldchannels, ...extras]
}

export default (state = channelContext(), action) => {
    const { type, content } = action

    switch (type) {
        case REGISTER_CHANNEL:
            return {
                ...state,
                channels: [...state.channels, content],
            }
        case REGISTER_ALL_CHANNELS:
            return {
                ...state,
                channels: AllChannels(state.channels, content),
            }
        case LOAD_CHANNEL:
            const allloadedchannels = [...state.loadedChannels, content]
            state.loadedChannels = allloadedchannels
            WriteStorage(state, 'channel')
            return {
                ...state,
                loadedChannels: allloadedchannels,
            }
        case FOCUS_CHANNEL:
            return {
                ...state,
                currentchannelID: content,
            }
        case SET_SERVER_MESSAGE:
            return {
                ...state,
                server_message: content,
            }
        case EXIT_CHANNEL:
            return {
                ...state,
                ...content,
            }
        default:
            return state
    }
}
